import Train from '@/components/Train/Train';
import Weather from '@/components/Weather/Weather';
// import Notion from '@/components/Notion/Notion';
import moment from 'moment';
import Image from "next/image";


export default function Dashboard() {
  return (
    <main className="flex flex-col items-start justify-start min-h-screen  p-12">
      <h2>{moment().format('dddd, MMMM D, YYYY')}</h2>
      <div className='grid grid-flow-col gap-5'>
        <Train />
        {/* <Notion /> */}
        <Weather />
      </div>
      
    </main>
  );
}
