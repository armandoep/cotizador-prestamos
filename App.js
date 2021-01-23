import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native'
import colors from './src/utils/colors'
import Form from './src/components/Form'
import Footer from './src/components/Footer'
import ResultCalculation from './src/components/ResultCalculation'

export default function App() {

  const [capital, setCapital] = useState(null)
  const [interest, setInterest] = useState(null)
  const [months, setMonths] = useState(null)
  const [total, setTotal] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if(capital && interest && months) calculate();
    else reset()
  }, [capital, interest, months])


  const calculate = () => {
    reset()
    if(!capital){
      setErrorMessage("Añade la cantidad que deseas solicitar")
    }else if(!interest){
      setErrorMessage("Añade el interes del prestamo")
    }else if(!months){
      setErrorMessage("Añade los meses del prestamo")
    }else{
      const i = interest / 100
      const fee = capital / (( 1 - Math.pow(i + 1, -months)) / i)
      setTotal({
        monthlyFee: fee.toFixed(2),
        totalPayable: (fee * months).toFixed(2)
      })
    }
}
const reset = () => {
  setErrorMessage(""),
  setTotal(null)
}

  return(
    
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style = {styles.safeArea}>
        <View style={styles.background}/>
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form 
        setCapital={setCapital}
        setInterest={setInterest}
        setMonths={setMonths}
        />
      </SafeAreaView>

      <ResultCalculation 
      errorMessage={errorMessage} 
      capital={capital}
      interest={interest}
      months={months}
      total={total}
      />

      <Footer calculate={calculate}/>
      </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    // backgroundColor: colors.PRIMARY_COLOR,
    height: 290,
    alignItems: "center",
    
  },

  titleApp : {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 25
  },

  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
    zIndex: -1
  }
})