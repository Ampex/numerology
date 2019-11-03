import React from 'react';
import './App.css';
import { Button, Grow } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const texts = [[''],['"To człowiek o cechach przywódczych, pionier przecierający innym szlaki, indywidualista, człowiek o silnej "wibracji", mocno zaznaczający swoją obecność, eksponujący swoje ego"'],['"To "dyplomata" mający świadomość dwóch obliczy świata, zainteresowany drugim człowiekiem, wrażliwy, kierujący się w życiu uczuciami"'],['"To człowiek ukierunkowany na osobiste spełnienie, o dużych talentach i możliwościach w każdej dziedzinie, we wszystkim co robi widać wolę działania, siłę, przedsiębiorczość oraz kreatywność. Ponieważ jednak jest zwykle osobą świecącą "światłem odbitym", to kiedy jest słabo ukierunkowana, zdeterminowana, trudno jej się odnaleźć"'],['"To logik osiągający najwięcej dzięki wytrwałości w zdobywaniu wiedzy, bardzo odporny na stres związany z pracą"'],['"To osoba chętnie ucząca się nowych rzeczy, otwarta na nowinki, mająca dużą łatwość w zdobywaniu wiedzy, wielką zmysłowość oraz związaną z tym skłonność do używek"'],['"To osoba rodzinna, uważająca rodzinę za fundament swojego życia i mocno z nią związana. Jest zwykle kreatywna intelektualnie, ma łatwość odnajdywania się w przestrzeni i czasie, nie lubi stawiać sobie ograniczeń, jest bardzo uczuciowa i wrażliwa"'],['"To osoba wrażliwa i introwertyczna, łatwo robiąca karierę zawodową, bardzo zainteresowana sprawami duchowymi. Zbyt silna siódemka powoduje nadmierne przywiązanie do materii"'],['"To twórca na dużą skalę, energia zmieniająca się w materię, osoba tworząca i działająca poprzez podświadomość, uparta i zdeterminowana w działaniu"'],['"To osoba opierająca swoje działanie na bezinteresownej miłości, posiadająca "wibrację" spełnienia"']]

class App extends React.Component {
  
  state = {
    value: "",
    nameValue: "",
    surNameValue: "",
    result: "",
  }
  
  handleSubmit = () => {

    const letters = [[""],["A","Ą","J","S","Ś"], ["B","K","T"], ["C","Ć","L","Ł","U"],["D","M","V"],["E","Ę","N","W"],["F","O","Ó","X"],["G","P","Y"],["H","Q","Z","Ż","Ź"],["I","R"]]

    const name = this.state.nameValue.toUpperCase()
    const surName = this.state.surNameValue.toUpperCase()    
    const reducer = (acc, cur) => acc + cur

    const mapNumberForLetter = letter => {

        var letterIndex = false
        letters.forEach((letterGroup, index) => {
          if (letterGroup.indexOf(letter) > -1) {
            letterIndex = index
            return
          }
        })
        return letterIndex
      }
    
    const result = [[...name].map(mapNumberForLetter).reduce(reducer),[...surName].map(mapNumberForLetter).reduce(reducer)].reduce(reducer)

    const finalResult = (numbersToString) => {
      numbersToString = [...result.toString()].map( el => parseInt(el, 10)).reduce(reducer)
      return (
        [...numbersToString.toString()].map( el => parseInt(el, 10)).reduce(reducer)
      )
    }

    this.setState ({
      value: [name, surName].join(" "),
      result: finalResult()
    })
  }

  render() {
    const { nameValue, surNameValue } = this.state

    return (
      <React.Fragment>

        <div className="apka">
        <div>
          <h1>Numerologia</h1>
          <p>Podaj dane aby poznać swój los.</p>
          <hr/>
        </div>

        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
          >
          <TextValidator
            name="imie"
            label="Twoje imię"
            margin="dense"
            variant="outlined"
            validators={['required', 'minStringLength:3']}
            value={nameValue}
            errorMessages={['To pole jest wymagane', 'Minimalna długość to 3 znaki']}
            onChange={(e) => this.setState({nameValue: e.currentTarget.value})} />

          <TextValidator
            name="nazwisko"
            label="Nazwisko"
            margin="dense"
            variant="outlined"
            validators={['required', 'minStringLength:2']}
            value={surNameValue}
            errorMessages={['To pole jest wymagane', 'Minimalna długość to 3 znaki']}
            onChange={(e) => this.setState({surNameValue: e.currentTarget.value})} />
  
          <Button className="send" variant="contained" color="primary" type="submit">Prześlij</Button>

        </ValidatorForm>
          
        </div>
          {this.state.result ?
          <Grow in timeout={1000} >
            <div className="result">
              <p>{this.state.value}</p>
              <p>Twój numer to: {this.state.result}</p>
            <p className="bigger">
            {texts[this.state.result]}
            </p>
            </div>
          </Grow> : false}

      </React.Fragment>
    ) 
  }
}

export default App