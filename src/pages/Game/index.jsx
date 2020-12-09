import React, { Component } from 'react';

// Alerts
import Swal from 'sweetalert2';

// Styles
import './styles.css';

// Bootstrap
import '../../assets/lib/bootstrap.min.css';

// Router
import { Redirect, Link } from 'react-router-dom';

// Components
import Board from '../../components/board';
import Field from '../../components/field';
import Button from '../../components/button';


// Services
import { gameData as game_data } from '../../services/data';
import { themes } from '../../services/themes';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class Game extends Component {

    state = {
        game: {
            p1: {
                nickname: "",
            },
            p2: {
                nickname: "",
            }
        },


        board: ['', '', '', '', '', '', '', '', ''],
        symbols: {
            options: ['X', 'O'],
            turn_index: Math.round(Math.random(0, 1)),
            change() {
                this.turn_index = (this.turn_index === 0) ? 1 : 0;
            }
        },

        winning_sequences: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        gameover: false,

        redirect: false

    }

    constructor(props) {
        super(props);

        this.make_play = this.make_play.bind(this);
        this.check_winning_sequences = this.check_winning_sequences.bind(this);
        this.check_tied = this.check_tied.bind(this);
        this.alert = this.alert.bind(this);
        this.scoreBoard = this.scoreBoard.bind(this);
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        const game = game_data.load();
        this.setState({ game });
        themes.loadThemes();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
     

      async boardUpdate(){
        
        const check_winning_sequences_index = this.check_winning_sequences(this.state.symbols.options[this.state.symbols.turn_index])
        if (check_winning_sequences_index >= 0) {
            this.setState({ gameover: true })

            const state = this.state;

            const last_round = {
                roundNumber: state.game.roundNumber,
                winner: {
                    player: (state.symbols.options[state.symbols.turn_index] === "X") ? 1 : 2,
                }
            }

            const nextGameStatus = game_data.nextRound(last_round);
            if (nextGameStatus.gameover === true) {
                const data = {
                    title: `Winner: ${(nextGameStatus.winner === 1) ? nextGameStatus.p1.nickname : nextGameStatus.p2.nickname}`,
                    text: `
                    <strong>${this.state.game.p1.nickname}</strong>: ${nextGameStatus.p1.score}<br>
                    <strong>${this.state.game.p2.nickname}</strong>: ${nextGameStatus.p2.score}<br><br>

                    Settings?
                    
                    `,
                    icon: 'success',
                    confirmText: 'Yes!',
                    confirmValue: () => this.setState({ redirect: true }),
                    canceledValue() { }
                }
                setTimeout(() => this.alert(data), 150);
            } else {
                await game_data.save(nextGameStatus)

                let timerInterval;
                Swal.fire({
                    title: 'Next round',
                    html: 'Next round in <b></b> milliseconds.',
                    timer: 700,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            const content = Swal.getContent()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                }
                            }
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                        this.start()
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        // console.log('I was closed by the timer')
                    }
                })

            }



        } 
        else {
            this.state.symbols.change();
            if (this.check_tied()) {
                this.setState({ gameover: true })


                const data = {
                    title: 'We Tied',
                    text: 'Restart?',
                    icon: 'info',
                    confirmText: 'Yes!',
                    cancelText: 'No!',
                    confirmValue() { },
                    canceledValue() { }
                }

                setTimeout(() => this.alert(data), 150);
            }
        }
      }


    async make_play(position) {
        console.log('You just clicked ')
        // State show trivia -> True
        //Show Trivia Question
        //Check if Trivia is correct
        //If Correct add X/O
        //If not change player
        if (this.state.gameover) return false;
        if (this.state.board[position] === '') {
            const board = this.state.board;
            const questions = [
            {
                questionText: 'A RIVER is bigger than a STREAM.?',
                answer: 'False',
                
            },
            {
                questionText: 'DOZEN is equivalent to 20?',
                answer: 'False',
                
            },
            {
                questionText: 'The past tense of FIND is FOUND?',
                answer: 'True',
            
            },
            {
                questionText: 'FOUNDED is the past tense of FOUND?',
                answer: 'True',
                
            },
            {
                questionText: 'There are two parts of the body that cannot heal themselves?',
                answer: 'False',
                
            },

{
                questionText: 'Roger Federer has won the most Wimbledon titles of any player?',
                answer: 'False',
                
            },
{
                questionText: 'A woman has walked on the moon?',
                answer: 'False',
                
            },
{
                questionText: 'The Great Wall of China is visible from space?',
                answer: 'False',
                
            },
{
                questionText: 'Napoleon was of below-average height?',
                answer: 'False',
                
            },
{
                questionText: 'Charlie Chaplin came first in a Charlie Chaplin look-alike contest?',
                answer: 'False',
                
            },
{
                questionText: 'Electrons are larger than molecules.?',
                answer: 'False',
                
            },
{
                questionText: 'The Atlantic Ocean is the biggest ocean on Earth?',
                answer: 'False',
                
            },
{
                questionText: 'The chemical make up food often changes when you cook it?',
                answer: 'True',
                
            },
{
                questionText: 'Sharks are mammals?',
                answer: 'False',
                
            },
{
                questionText: 'The human body has four lungs?',
                answer: 'False',
                
            },
{
                questionText: 'Atoms are most stable when their outer shells are full?',
                answer: 'True',
                
            },
{
                questionText: 'Filtration separates mixtures based upon their particle size?',
                answer: 'True',
                
            },
{
                questionText: 'Venus is the closest planet to the Sun?',
                answer: 'False',
                
            },
{
                questionText: 'Conductors have low resistance?',
                answer: 'True',
                
            },
{
                questionText: 'Molecules can have atoms from more than one chemical element?',
                answer: 'True',
                
            },
            ];
    
            var trivia = questions[this.getRandomInt(20)];
            confirmAlert({
                title: 'Trivia',
                message: trivia.questionText,
                buttons: [
                    {
                    label: 'True',
                    onClick: () => {
                        //console.log(trivia.answer == 'True')
                        if (trivia.answer == 'True'){
                          //  console.log("Hello")
                            board[position] = this.state.symbols.options[this.state.symbols.turn_index];
                            this.setState({ board })
                            this.boardUpdate();
                        }
                    }
                    },
                  {
                    label: 'False',
                    onClick: () => {
                        if (trivia.answer == 'False'){
                            //  console.log("Hello")
                              board[position] = this.state.symbols.options[this.state.symbols.turn_index];
                              this.setState({ board })
                             this.boardUpdate();
                          } 
                    }
                  }
                ]
              });
           
       
           
        
            return true;
        } 
        
        else {
            return false;
        }
    }



    check_winning_sequences(symbol) {

        let returned = -1;

        // eslint-disable-next-line
        this.state.winning_sequences.map((value, i) => {
            if (this.state.board[this.state.winning_sequences[i][0]] === symbol &&
                this.state.board[this.state.winning_sequences[i][1]] === symbol &&
                this.state.board[this.state.winning_sequences[i][2]] === symbol) {
                returned = i;
            }
        });
        return returned;
    }

    // If tied return true
    check_tied() {
        let returned = true;

        // eslint-disable-next-line
        this.state.board.map((value, i) => {
            if (this.state.board[i] === '') returned = false;
        });
        return returned;
    }

    alert(data) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success confirmBtn',
                cancelButton: 'btn btn-secondary cancelBtn'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: data.title,
            html: data.text,
            icon: data.icon,
            showCancelButton: (data.cancelText) ? true : false,
            confirmButtonText: data.confirmText,
            cancelButtonText: data.cancelText,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                // Accept
                this.start();
                data.confirmValue();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Canceled
                data.canceledValue();
            }

        })
    }

    scoreBoard() {
        const game = game_data.load();
        alert(`
            ${game.p1.nickname}: ${game.p1.score}
            ${game.p2.nickname}: ${game.p2.score}
        `);
    }




    start() {

        const symbols = this.state.symbols;
        let board = this.state.board;
        symbols.turn_index = Math.round(Math.random(0, 1));
        board.fill('');

        this.setState({ symbols, board, gameover: false });
    }



    render() {
        
        if (this.state.redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <div className="Game"
                
                /*style={{

                    position: "fixed",
                    top:"0", 
                    left:"0", 
                    width:"100%", 
                    height:"100%",
                    zIndex: "-1",

                    display:"block",
                    top: "50%",
                    left: "50%",
                    "-ms-transform": "translate(-50%, -50%)",
                    transform: "translate(-50%, -50%)",
                    alignContent: "center",
                    textAlign:"center",
                    alignItems:"center",

                }}*/
                >
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
                    }}
                    >

                    <heading style={{fontSize: "80px", textAlign: "center", color:"white", textShadow:"-10px 10px 0 #000", 
                    /*border:"10px solid black", paddingBottom: "500px"*/}}>TIC-TAC TRIVIA</heading>

                    <h1 className="player"
                    style={{
                        color:"white", 
                        fontSize:"40px",
                        border: "5px dotted black",
                        padding: "5px",
                        boxSizing:"content-box",

                        paddingTop:"20px",
                        alignContent:"center",
                        width:"400px",
                        marginLeft: "auto",
                        marginRight: "auto"


                    }}
                    >Turn: {(this.state.symbols.options[this.state.symbols.turn_index] === "X") ? this.state.game.p1.nickname : this.state.game.p2.nickname} ({this.state.symbols.options[this.state.symbols.turn_index]})</h1>

                    <Board
                    
                    >
                        {this.state.board.map((value, index) =>
                            <Field key={index} click={() => this.make_play(index)}>{value}</Field>)
                        }
                    </Board>

                    <div className="buttons"
                    style={{
                        position: "absolute",
                        top: "110%",
                        left: "50%",
                        "-ms-transform": "translate(-50%, -50%)",
                        transform: "translate(-50%, -50%)",
                        width:"auto",
                        height:"auto",
                        paddingBottom: "50px"
                    }}
                    
                    >
                        <Link to="/"><Button value="Settings" /></Link>
                        <Button onClick={() => this.scoreBoard()} value="Score Board" />
                        <Button onClick={() => this.start()} value="Restart" />
                    </div>
                </div>
                </div>
            );
        }
    }
}

export default Game;

