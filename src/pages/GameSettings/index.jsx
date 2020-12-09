import React, { Component } from 'react';


// Styles
import './styles.css';


// Router
import { Redirect } from 'react-router-dom'

// Components
import Button from '../../components/button';


// Services
import { gameData as game_data } from '../../services/data';
import { themes } from '../../services/themes';



class GameSettings extends Component {

    state = {

        maxRounds: 1,

        redirect: false,
        nicknameP1: 'Player 1',
        nicknameP2: 'Player 2',

        inputP1: '',
        inputP2: '',
    }

    constructor(props) { 
        super(props);

        this.setRounds = this.setRounds.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
    }

    setRounds(rounds) {
        this.setState({ maxRounds: rounds });
    }

    async start() {
        const maxRounds = this.state.maxRounds;
        const nicknameP1 = this.state.nicknameP1;
        const nicknameP2 = this.state.nicknameP2;

        const gameData = await game_data.generateData(maxRounds, nicknameP1, nicknameP2);
        await game_data.save(gameData);
        this.setState({ redirect: true });
    }

    componentDidMount() {
        const data = localStorage.getItem("game_data") ? game_data.load() : { p1: {}, p2: {} };
        const newState = {};
        if (data.p1.nickname && data.p1.nickname !== "Player 1") {
            newState.nicknameP1 = data.p1.nickname;
            newState.inputP1 = data.p1.nickname;
        }

        if (data.p2.nickname && data.p2.nickname !== "Player 2") {
            newState.nicknameP2 = data.p2.nickname;
            newState.inputP2 = data.p2.nickname;
        }

        if (data.maxRounds) {
            newState.maxRounds = data.maxRounds;
        }

        this.setState(newState);

        localStorage.removeItem("game_data")


        themes.loadThemes();

    }

    changeTheme(themeIndex) {

        switch (themeIndex) {
            case 0:
                themes.setTheme(themes.themes_data.dark);
                break;
            case 1:
                themes.setTheme(themes.themes_data.blue);
                break;
            default:
                themes.setTheme(themes.themes_data.dark);
                break;
        }

    }




    render() {
        if (this.state.redirect) {
            return <Redirect to="/ticTacToe" />
        } else {

            return (
                <div className="GameSettings"
                
                /*style={{
                    textAlign:"center", 
                    alignContent:"center",
                    border: "5px solid black",
                    padding: "20px"
                }}*/

                style={{
                    
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    "-ms-transform": "translate(-50%, -50%)",
                    transform: "translate(-50%, -50%)",
                    alignContent: "center",
                    textAlign:"center",
                    alignItems:"center",

                    width:"100%",
                    height:"100%",

    

                    /*position:fixed;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;*/
                }}
                >

                    <heading style={{fontSize: "90px", textAlign: "center", color:"white", textShadow:"-10px 10px 0 #000"}}>TIC-TAC TRIVIA</heading>

                    <div

                        style={{
                            margin: 0,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            "-ms-transform": "translate(-50%, -50%)",
                            transform: "translate(-50%, -50%)",
                            width:"auto",
                            height:"auto",

                            alignItems:"center",
                            alignContent:"center",
                            textAlign:"center",
                            align:"center",

                            border: "10px solid black",
                            padding: "30px",
                            boxShadow:"0 0 20px white"


                        }}

                        /*style={{
                            align: "center",
                            width: "600px",
                            border: "5px dotted black",
                            padding: "20px",
                            marginLeft: "auto",
                            marginRight: "auto"
                                
                            }}*/


                        >
                    
                    {/*
                    <div className="themesSets"  >
                        <ul>
                            <li>
                                <Button onClick={() => this.changeTheme(0)} value={themes.themes_data.dark.title} />
                            </li>

                            <li>
                                <Button onClick={() => this.changeTheme(1)} value={themes.themes_data.blue.title} />
                            </li>

                        </ul>
                    </div>
                    */}

                    <div className="rounds">
                        <h1>Rounds: </h1>
                        <ul>
                            <li>
                                <Button onClick={() => this.setRounds(1)} value="1" />
                            </li>

                            <li>
                                <Button onClick={() => this.setRounds(3)} value="3" />
                            </li>

                            <li>
                                <Button onClick={() => this.setRounds(5)} value="5" />
                            </li>
                        </ul>
                    </div>
                    <div className="players">
                        <div>
                            <h1>Player 1: </h1>
                            <input type="text" placeholder="Name..." className="inputNickname" onChange={(e) => this.setState({ inputP1: e.target.value, nicknameP1: e.target.value })} value={this.state.inputP1} />
                        </div>

                        <div>
                            <h1>Player 2: </h1>
                            <input type="text" placeholder="Name..." className="inputNickname" onChange={(e) => this.setState({ inputP2: e.target.value, nicknameP2: e.target.value })} value={this.state.inputP2} />
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => this.start()} value="Start!" />
                    </div>
                    </div>
                    </div>
             
            );
        }
    }
}

export default GameSettings;