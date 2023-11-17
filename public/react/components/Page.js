import React from 'react';

export const Page = ({page, onClick}) => {

  return <>
      <h3 onClick={onClick} style={{ cursor: 'pointer' }}>
        {page.title}
      </h3>
  </>
} 
	