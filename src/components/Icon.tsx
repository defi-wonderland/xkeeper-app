import styled from 'styled-components';

export type IconName =
  | 'alert-circle'
  | 'arrow-left'
  | 'arrow-right'
  | 'back'
  | 'check'
  | 'check-circle'
  | 'chevron-down'
  | 'chevron-right'
  | 'close'
  | 'copy'
  | 'exclamation-triangle'
  | 'external-link'
  | 'menu'
  | 'moon'
  | 'owned'
  | 'plus'
  | 'safe'
  | 'search'
  | 'sun'
  | 'x-circle'
  | 'pencil-square';

export const Icon = styled.i.attrs<{ name: IconName }>((props) => ({
  className: `icon-${props.name}`,
}))<{
  name: IconName;
  color?: string;
  size?: string;
  padding?: string;
  rotate?: number;
}>`
  display: inline-block;
  font-size: ${(props) => props.size || '1.8rem'};
  transform: rotate(${(props) => props.rotate || 0}deg);
  &:before {
    color: ${(props) => props.color || 'inherit'};
  }
`;
