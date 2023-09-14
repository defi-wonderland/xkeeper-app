import * as React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, Typography } from '@mui/material';

import { useStateContext } from '~/hooks';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'span'} fontSize={'1.4rem'}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
  sections: {
    title: string;
    items?: React.ReactNode;
  }[];
}

export const BasicTabs = ({ sections }: BasicTabsProps) => {
  const [value, setValue] = React.useState(0);
  const { currentTheme } = useStateContext();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='inherit'
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: currentTheme.tabColor,
            },
          }}
        >
          {sections.map((section, index) => (
            <Tab
              label={section.title}
              {...a11yProps(index)}
              sx={{ fontSize: '1.6rem', textTransform: 'none' }}
              key={section.title}
            />
          ))}
        </Tabs>
      </Box>

      {sections.map((section, index) => (
        <CustomTabPanel value={value} index={index} key={section.title}>
          {section.items}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
