import { useState } from 'react'
import styles from './calculador.module.css'

const Calculador = () => {
    const [valorAtual, setValorAtual] = useState('0')
    const [operacaoPendente, setOperacaoPendente] = useState(null)
    const [valorPendente, setValorPendente] = useState(null)
    const [operacaoCompleta, setOperacaoCompleta] = useState('')

    const numeros = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '0']
    const operacoes = ['+','-','*','/']

    const handleClick = (val) => {

        setValorAtual((prevValue) => { //aqui esta concatenando o valor atual com o digitado
            if(prevValue === '0') { // se for 0 nao concatena
                return val;
            }else {
                return prevValue + val // se nao for, concatena 
            }
        });

        setOperacaoCompleta((prevOperation) => prevOperation + val) //operacao atual mais o valor
    }

    //funcao dos botoes de operações
    const handleOperation = (operacao) => {
        setOperacaoCompleta(valorAtual + ' ' + operacao + ' ')

        setOperacaoPendente(operacao)

        setValorPendente(valorAtual)

        setValorAtual('0')
    }

    //função do botao de igual
    const handleCalcular = (igual) => {

        if (!operacaoPendente || !valorPendente) {
            return    //caso os valores são vazios então ja da um return
        }

        const num1 = parseFloat(valorPendente)
        const num2 = parseFloat(valorAtual)

        let result 

        switch (operacaoPendente) {
            case '+':
                result = num1 + num2
                
                break
            case '-':
                result = num1 - num2;
            
                break
            case '*':
                result = num1 * num2;
            
                break
            case '/':
                result = num1 / num2
                break

            default :
            break;
        }

        setOperacaoCompleta(valorPendente + ' ' + operacaoPendente + ' ' + valorAtual + ' = ' + result)

        setValorAtual(result.toString())

        setOperacaoPendente(null)
        setValorPendente(null)
    }

    const handleClear = () => {
        setOperacaoCompleta('')
        setValorAtual('0')
    }

    return (
        <div className={styles.calculadora}>

            <div className={styles.complete_operacao}>
                {operacaoCompleta}
            </div>

            <div className={styles.display}>
                {valorAtual}
            </div>

            <div className={styles.botoes}> 
                <button onClick={() => handleClear()}>AC</button>
            
                {numeros.map((num) => (

                    <button key={num} onClick={() => handleClick(num)}>{num}</button>
                ))}
            
            
                {operacoes.map((operacao) => (
                    
                    <button key={operacao} onClick={() => handleOperation(operacao)}>{operacao}</button>

                ))}

                <button className={styles.botao} onClick={(click) => handleCalcular(click)}>=</button>
            </div>


        </div>
    )
}

export default Calculador