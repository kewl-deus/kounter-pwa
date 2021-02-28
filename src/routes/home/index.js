import { h } from 'preact';
import style from './style.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';

const list = [
  { name: 'Amiee Beverley', counter: 0 },
  { name: 'Janine Rodrique', counter: 0 },
  { name: 'Malisa Portales', counter: 0 },
  { name: 'Lane Mcpeak', counter: 0 },
  { name: 'Ollie Bouknight', counter: 0 },
  { name: 'Omar Flink', counter: 0 },
  { name: 'Kenisha Lombard', counter: 0 },
  { name: 'Maynard Deal', counter: 0 },
  { name: 'Eryn Valla', counter: 0 },
  { name: 'Drema Signorelli', counter: 0 },
  { name: 'Matilda Ocegueda', counter: 0 },
  { name: 'Teresita Adams', counter: 0 },
  { name: 'Patrina Nunnery', counter: 0 },
  { name: 'Sau Luque', counter: 0 },
  { name: 'Dagny Surrett', counter: 0 },
  { name: 'Quiana Rasberry', counter: 0 },
  { name: 'Nery Apicella', counter: 0 },
  { name: 'Bennie Goldsmith', counter: 0 },
  { name: 'Sharice Bennette', counter: 0 },
  { name: 'Maris Olden', counter: 0 },
  { name: 'Joane Lentini', counter: 0 },
  { name: 'Keitha Brogden', counter: 0 },
  { name: 'Meda Lauffer', counter: 0 },
  { name: 'Malik Trout', counter: 0 },
  { name: 'Marilee Levell', counter: 0 },
  { name: 'Maurine Beedle', counter: 0 },
  { name: 'Sammie Anton', counter: 0 },
  { name: 'Janell Parker', counter: 0 },
  { name: 'Tim Borunda', counter: 0 },
  { name: 'Carlita Otter', counter: 0 },
]

const Home = () => {
  const counterBodyTemplate = (row) => {
    return <Rating value={row.counter} readOnly cancel={false} />;
  }

  return (
    <main class={style.home}>
      <p>This is the Home component.</p>

      <DataTable value={list}>
        <Column field="name" header="Name"></Column>
        <Column field="counter" header="Counter" body={counterBodyTemplate}></Column>
      </DataTable>
    </main>
  )
};

export default Home;
