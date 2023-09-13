import * as React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, Typography } from '@mui/material';

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

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          {sections.map((section, index) => (
            <Tab label={section.title} {...a11yProps(index)} sx={{ fontSize: '1.4rem' }} key={section.title} />
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
