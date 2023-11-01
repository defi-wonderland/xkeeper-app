import { styled } from '@mui/material';
import { css } from '@mui/system';

import { useStateContext } from '~/hooks';

export const STextarea = styled('textarea')(() => {
  const { currentTheme } = useStateContext();

  return css`
    font-size: 1.6rem;
    resize: none;
    font-family: inherit;
    border-radius: ${currentTheme.borderRadius};
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    border: ${currentTheme.inputBorder};
    background-color: inherit;
    padding: 1rem 1.4rem;
    width: 100%;
    height: 18rem;
    font-weight: 400;
    color: ${currentTheme.textPrimary};
    opacity: 1;

    &:disabled {
      color: ${currentTheme.textDisabled};
    }

    &:focus-visible {
      outline: none;
    }

    &:hover {
      border-color: ${currentTheme.textDisabled} !important;
      transition: ${currentTheme.basicTransition};
    }

    overflow-y: overlay;
    overflow-x: hidden; /* Hide scrollbars */

    &::-webkit-scrollbar {
      width: 4px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 4px;
    }

    &:disabled {
      opacity: 1;
    }

    &:hover {
      border-color: ${currentTheme.textPrimary};
    }

    &::placeholder {
      color: ${currentTheme.textDisabled};
      font-weight: 500;
    }
  `;
});
