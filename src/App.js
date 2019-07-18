import React from "react";
import "./App.css";
import update from "immutability-helper";

const whiteTurn = Symbol("white");
const blackTurn = Symbol("black");
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chessPieces: Array(8)
        .fill()
        .map((n, i) =>
          Array(8)
            .fill()
            .map((n2, i2) => ({
              row: i + 1,
              col: i2 + 1,
              isOccupiedByBlack: false,
              isOccupiedByWhite: false
            }))
        ),
      turn: blackTurn
    };
  }

  placeChess = (chess, i, j) => {
    if (chess.isOccupiedByBlack || chess.isOccupiedByWhite) {
      return;
    }

    const { turn } = this.state;
    if (turn === whiteTurn) {
      this.setState(prevState => ({
        chessPieces: update(prevState.chessPieces, {
          [i]: {
            [j]: { isOccupiedByWhite: { $set: true } }
          }
        }),
        turn: blackTurn
      }));
    }

    if (turn === blackTurn) {
      this.setState(prevState => ({
        chessPieces: update(prevState.chessPieces, {
          [i]: {
            [j]: { isOccupiedByBlack: { $set: true } }
          }
        }),
        turn: whiteTurn
      }));
    }
  };

  render() {
    const { chessPieces, turn } = this.state;

    return (
      <div className="container">
        {chessPieces.map((item, i) => (
          <div className="row">
            {item.map((chess, j) => (
              <div
                className="chess-item"
                onClick={() => this.placeChess(chess, i, j)}
              >
                {chess.isOccupiedByBlack && (
                  <img src={require("./assets/images/black.png")} alt="" />
                )}
                {chess.isOccupiedByWhite && (
                  <img src={require("./assets/images/white.png")} alt="" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
