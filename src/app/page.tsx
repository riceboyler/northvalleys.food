
import { QueryResult, QueryData } from '@supabase/supabase-js';
import { createClient } from '~/utils/supabase/server';
import { cookies } from 'next/headers';
import dayjs from 'dayjs';
import { Card, Table } from '../components/ParkUI';
import { Flex, Grid } from '../../styled-system/jsx';

type ScheduleRow = {
  date: Date;
  start_time: string;
  end_time: string;
  location: {
    name: string;
    address: string;
  };
  truck: {
    name: string;
  };
};

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const scheduleWithLocationTruck = await supabase.from('schedule').select(`
    date,
    start_time,
    end_time,
    location (
      name,
      address
    ),
    truck (
      name
    )
    `).returns<ScheduleRow[]>();

  type ScheduleWithLocationTruck = QueryData<typeof scheduleWithLocationTruck>;
  const schedule = scheduleWithLocationTruck.data;

  const todaySchedule = schedule?.filter((row) => dayjs(row.date).isSame(dayjs(), 'day'));

  return (
    <>
      <h1>Today's Trucks</h1>
      <Flex direction={{ base: 'column', md: 'row' }} gap="16px" justifyContent="center" alignItems="center">
        {todaySchedule?.map((row) => (
          <Card.Root width="sm" key={row.truck.name}>
            <Card.Header>
              <Card.Title>{row.truck.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <h6>{row.start_time} til {row.end_time}</h6>
              {row.location.name} - {row.location.address}
            </Card.Body>
          </Card.Root>
        ))}
      </Flex>

      <h1>Full Schedule</h1>
      <Table.Root colorPalette="accent">
        <Table.Caption>North Valleys Food Truck Schedule</Table.Caption>
        <Table.Head>
          <Table.Row fontWeight="bold">
            <Table.Header>Location</Table.Header>
            <Table.Header>Date</Table.Header>
            <Table.Header>Truck</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {schedule?.map((row) => (
            <Table.Row fontWeight={dayjs(row.date).isSame(dayjs(), 'day') ? 'bold' : 'initial'} key={`${dayjs(row.date).format('MM/DD')} - ${row.truck.name}`}>
              <Table.Cell>{row.location?.name}</Table.Cell>
              <Table.Cell>{dayjs(row.date).format('ddd, MMM D')}<br />{row.start_time} - {row.end_time}</Table.Cell>
              <Table.Cell>{row.truck?.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
