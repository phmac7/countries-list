import { CountryDetailsTemplateSkeleton } from '@/templates/CountryDetailsTemplate';
import React from 'react';

export default function Loading() {
  return (
    <CountryDetailsTemplateSkeleton data-testid="country-details-template-skeleton" />
  );
}
