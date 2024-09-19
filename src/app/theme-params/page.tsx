'use client';

import { useThemeParams } from '@telegram-apps/sdk-react';
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData';
import BackButton from '@/components/BackButton/BackButton';

export default function ThemeParamsPage() {
  const themeParams = useThemeParams();

  const backButton = BackButton();

  return (
    <List>
      <DisplayData
        rows={
          Object
            .entries(themeParams.getState())
            .map(([title, value]) => ({
              title: title
                .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
                .replace(/background/, 'bg'),
              value,
            }))
        }
      />
    </List>
  );
};
