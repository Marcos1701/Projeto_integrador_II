import { useContext } from "react";
import "./box.css";
import { ITransacao, tratarData } from "../../../ListTransacoesCard/Components/Transacao";
import { ICategoria } from "../../../ListCategorias/Components/Categoria";
import { realizarTratamentoValor } from "../../../../Home/Components/SecaoAcoes/Components/Saldo";
import axios from "axios";
import { api_url, useAuth } from "../../../../../Contexts/AuthContext";
import { TransacoesContext } from "../../../../../Contexts/TransacoesContext";

export interface ITransacaoboxProps {
    transacao: ITransacao;
    categoria: ICategoria;
    setShowDetails?: React.Dispatch<React.SetStateAction<boolean>>;
    setTransacao?: React.Dispatch<React.SetStateAction<ITransacao | undefined>>;
}


export const Box = (
    {
        transacao,
        categoria,
        setShowDetails,
        setTransacao
    }: ITransacaoboxProps
): JSX.Element => {

    const { user } = useAuth()

    if (!user) return (<></>)

    const { setUpdated } = useContext(TransacoesContext)

    const HandleDelete = async () => {
        const response = await axios.delete(`${api_url}transacoes/${transacao.id}`, {
            headers: {
                Authorization: user.access_token
            }
        }).then((response) => {
            if (response.status === 204) {
                setUpdated(true)
            }
            return response
        })
        console.log(response)
    }

    return (
        <div className="transacao-box" id={transacao.id}>
            <div className="item">
                <a className="navbar" onClick={() => {
                    setTransacao && setTransacao(transacao)
                    setShowDetails && setShowDetails(true)
                }}>
                    <div className="title-icon">
                        <div className="icon-div"><img className="icon-Categoria" src={`assets/icons/${categoria.icone ? categoria.icone : 'barraquinha'}.svg`} alt="Icone da categoria" /></div>
                        {transacao.titulo}
                    </div>
                    <div className="div">{categoria.nome}</div>
                    <div className="text-wrapper-2">{tratarData(transacao.data.toString(), 'simplificado')}</div>
                    <div className={
                        "valorTransacao-" + transacao.tipo
                    } >R$ {realizarTratamentoValor(transacao.valor)}</div>

                </a>
                <button className="ButtonDelete" onClick={HandleDelete}><img className='icon' src="assets/ActionsIcons/delete.svg" alt="Deletar" /></button>
            </div>
            <svg id="vector" width="530" height="2" viewBox="0 0 545 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.496094 0.805695H544.239" stroke="#47B5FF" strokeWidth="0.5" />
            </svg>

        </div>
    );
};