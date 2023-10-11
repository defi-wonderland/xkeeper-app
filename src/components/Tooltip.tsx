import { Tooltip, Typography, styled } from '@mui/material';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { useStateContext } from '~/hooks';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  text: string;
  address?: boolean;
  open?: boolean;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))();

export const STooltip = ({ children, text, placement, address, open }: Props) => {
  const {
    currentTheme: { tooltipBackground, tooltipColor },
  } = useStateContext();

  const textStyles = {
    fontSize: '1.2rem',
    color: tooltipColor,
  };

  const tooltipStyles = {
    [`& .${tooltipClasses.arrow}`]: {
      color: tooltipBackground,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: tooltipBackground,
      borderRadius: '0.8rem',
      padding: '0.8rem 1.2rem',
      maxWidth: address ? 'max-content' : 'auto',
    },
  };

  return (
    <CustomTooltip
      open={open}
      title={
        <Typography component='span' sx={textStyles}>
          {text}
        </Typography>
      }
      placement={placement ? placement : 'top'}
      sx={tooltipStyles}
      disableInteractive
      enterDelay={0}
      leaveDelay={0}
    >
      {children}
    </CustomTooltip>
  );
};
