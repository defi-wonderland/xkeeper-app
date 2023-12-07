import { describe, expect, it } from 'vitest';
import { act, render, screen } from '../test-utils';

import { Landing } from '~/pages';

describe('Renders every component', () => {
  it('Renders Landing page component', async () => {
    await act(async () => {
      render(<Landing />);
    });

    expect(screen.getByTestId('create-vault-btn')).toBeInTheDocument();
  });
});
