"use client";
import React from 'react';

import { useForm } from '@tanstack/react-form';

import { HStack } from 'styled-system/jsx';
import { Button, Card } from '~/components/ParkUI';

import { AddEditLocationForm } from './addEditLocation.form';
import { createClient } from '../../../../utils/supabase/client';
import { type Location } from '../page';

type Props = {
  location: Location;
};

export const EditableCard = ({ location }: Props) => {
  const supabase = createClient();
  const [isEditing, setIsEditing] = React.useState(false);
  const form = useForm<Location>({
    defaultValues: {
      id: location?.id ?? 0,
      created_at: location?.created_at ?? '',
      name: location?.name ?? '',
      address: location?.address ?? '',
      address2: location?.address2 ?? '',
      city: location?.city ?? '',
      state: location?.state ?? '',
      zip: location?.zip ?? '',
      public: location?.public ?? false
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      supabase.from('location').upsert(value);
      setIsEditing(false);
    }
  });

  return (
    <Card.Root
      key={location.id}
      width="xs"
    >
      <Card.Header>
        <Card.Title>{location.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        {isEditing ? (
          <AddEditLocationForm location={location} />
        ) : (
          <address>
            {location.address}
            {location.address2 && <br />}
            {location.address2}
            <br />
            {location.city}, {location.state} {location.zip}
            <HStack>Public? {location.public ? 'Yes' : 'No'}</HStack>
          </address>
        )}
      </Card.Body>
      <Card.Footer>
        <HStack>
          {isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          ) : null}
          {isEditing ? (
            <Button
              variant="solid"
              type="submit"
              onClick={() => form.handleSubmit()}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="solid"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};