
import { QueryData } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';

import { createClient } from '~/utils/supabase/server';

import { Box, Flex } from '../../styled-system/jsx';
import { Card, Table } from '../components/ParkUI';

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

  const scheduleWithLocationTruck = await supabase.from('schedule')
    .select(`
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
    `)
    .filter(
      'date', 'gte', dayjs().add(
        -1, 'day'
      ).endOf('day')
    )
    .filter(
      'date', 'lte', dayjs().add(
        1, 'week'
      )
    )
    .order('date').returns<ScheduleRow[]>();

  type ScheduleWithLocationTruck = QueryData<typeof scheduleWithLocationTruck>;
  const schedule = scheduleWithLocationTruck.data;

  const todaySchedule = schedule?.filter((row) => dayjs(row.date).isSame(
    dayjs(), 'day'
  ));

  return (
    <>
      <Box
        textStyle="4xl"
        marginBottom="8px"
      >Today's Trucks
      </Box>
      <Flex
        direction={{
          base: 'column',
          md: 'row'
        }}
        gap="16px"
        justifyContent="center"
        alignItems="center"
      >
        {todaySchedule?.map((row) => (
          <Card.Root
            width={{
              base: "xs",
              md: "sm"
            }}
            key={row.truck.name}
            border="solid 1px"
            borderColor="primary"
          >
            <Card.Header>
              <Card.Title>{row.truck.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <h6>{row.start_time} until {row.end_time}</h6>
              {row.location.name} - {row.location.address}
            </Card.Body>
          </Card.Root>
        ))}
      </Flex>

      <Box
        textStyle="3xl"
        marginTop="16px"
      >Full Schedule
      </Box>
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
            <Table.Row
              fontWeight={dayjs(row.date).isSame(
                dayjs(), 'day'
              ) ? 'bold' : 'initial'}
              key={`${dayjs(row.date).format('MM/DD')} - ${row.truck.name}`}
            >
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
