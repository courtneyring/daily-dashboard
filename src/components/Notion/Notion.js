import { useEffect } from 'react';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json())
const pageId = '681d2c853ec140828df525e032aecfd7';
const key = 'secret_znjtfO4uwryyMISgZfchHgG7erFXK1Y00t3NxH23ujQ';

export default function Notion() {
  const data = fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    headers: new Headers({
      'Authorization': `Bearer ${key}`,
      'Notion-Version': '2022-06-28'
    }),
  })


  return <></>
}

