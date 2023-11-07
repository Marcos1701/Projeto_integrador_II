import { ListTransacoes } from "../ListTransacoes";
import { ListCategorias } from "../ListCategorias";
// import { ListMetas } from "../ListMetas";
import { SecaoActions_Home } from "./Components/SecaoAcoes";
import './Home.css'
import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="Home">
      <SecaoActions_Home />
      <section className="trasacoes-home">
        <div className="achors-page">
          <Link to="/Transacoes" className="title-section" id="anchor-transacoes-page"><h3>Transações</h3></Link>
          <Link to="/Transacoes" className="anchor-page" id="anchor-transacoes">ver mais</Link>
        </div>
        <ListTransacoes pagination={false} />
      </section>

      <section className="categorias-home">
        <div className="achors-page">
          <Link to="/Categorias" className="title-section" id="anchor-categorias-page"><h3>Categorias</h3></Link>
          <Link to="/Categorias" className="anchor-page" id="anchor-categorias">ver mais</Link>
        </div>
        <ListCategorias />
      </section>

      {/* <section className="metas-home">
        <div className="achors-page">
          <Link to="/Metas" className="title-section" id="anchor-metas-page"><h3>Metas</h3></Link>
          <Link to="/Metas" className="anchor-page" id="anchor-metas">ver mais</Link>
        </div>
        <ListMetas />
      </section> */}
    </main>
  )
}