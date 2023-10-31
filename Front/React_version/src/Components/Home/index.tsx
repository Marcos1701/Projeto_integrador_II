import { ListTransacoes } from "../ListTransacoes";
import { ListCategorias } from "../ListCategorias";
import { ListMetas } from "../ListMetas";
import { SecaoActions_Home } from "./Components/SecaoAcoes";
import './Home.css'

export function Home() {
  return (
    <main className="Home">
      <SecaoActions_Home />
      <h2>Transações</h2>
      <ListTransacoes pagination={false}/>
      <h2>Categorias</h2>
      <ListCategorias />
      <h2>Metas</h2>
      <ListMetas />
    </main>
  )
}