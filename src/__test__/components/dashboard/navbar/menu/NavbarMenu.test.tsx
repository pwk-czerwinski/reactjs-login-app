import React from 'react';
import { render } from '@testing-library/react';
import NavbarMenu from '../../../../../components/dashboard/navbar/menu/NavbarMenu';

it('should show menu with logout option',() => {
    const { getByText } = render(<NavbarMenu />);
    expect(getByText('Logout')).toBeInTheDocument()
});
