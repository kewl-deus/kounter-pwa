import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';

import style from './style.css';

import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';

async function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.readAsText(file);
  });
}

function parseCSV(content, separator = ',') {
  const lines = content.split('\n');
  const parts = lines.map(line => line.split(separator));
  const output = {};

  let current = null;

  for (const [parent, element] of parts) {
    if (parent !== '') {
      current = parent;
      output[current] = [];
    }

    output[current].push({ name: element, counter: 0 });
  }

  return output;
}

function makeOptions(data) {
  return Object.keys(data).map(key => ({ label: key, value: key }));
}

const Home = () => {
  const [fileDialog, setFileDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({});

  const fileInput = useRef(null);

  const counterBodyTemplate = (row) => {
    return (
      <InputNumber value={row.counter} showButtons buttonLayout="horizontal" step={1} min={0}
        decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success"
        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" readOnly />
    );
  }

  const importFile = () => {
    setFileDialog(false);
    fileInput.current.upload();
  }

  const onFileUpload = async (event) => {
    const content = await readFile(event.files[0]);
    const data = parseCSV(content);
    const options = makeOptions(data);

    setData(data);
    setOptions(options);
  }

  const openDialog = () => {
    setFileDialog(true);
  }

  const hideDialog = () => {
    setFileDialog(false);
  }

  const fileDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={importFile} />
    </>
  );

  const leftToolbarTemplate = <Dropdown placeholder="Select a list" value={selected} options={options} onChange={e => setSelected(e.value)}></Dropdown>
  const rightToolbarTemplate = <Button label="Import file" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openDialog} />

  return (
    <main class={style.home}>
      <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

      <DataTable value={data[selected]}>
        <Column field="name" header="Name"></Column>
        <Column field="counter" header="Counter" body={counterBodyTemplate}></Column>
      </DataTable>

      <Dialog visible={fileDialog} style={{ width: '450px' }} header="Import file" modal class="p-fluid" footer={fileDialogFooter} onHide={hideDialog} focusOnShow={false}>
        <div className="p-field">
          <FileUpload ref={fileInput} mode="basic" accept=".csv" label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" customUpload uploadHandler={onFileUpload} />
        </div>
      </Dialog>
    </main>
  )
};

export default Home;
