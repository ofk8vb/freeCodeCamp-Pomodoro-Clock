import React from "react";
import Clock from "./Clock";

let soundToPlay = new Audio(
  "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerRunning: false,
      timerType: "In Session",
      timer: 1500,
      timeToDisplay: "",
      bootState: true
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({ timeToDisplay: this.digitalClockFunction() });
  }

  onButtonClick = (e) => {
    if (e.target.value === "incrSes" || e.target.value === "decrSes") {
      this.modifySessionLength(e);
    } else if (e.target.value === "incrBr" || e.target.value === "decrBr") {
      this.modifyBreakLength(e);
    } else if (e.target.value === "reset") {
      this.resetTimer();
    } else if (e.target.value === "start-stop") {
      this.startStopTimer();
    }
  };

  //taken from https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
  digitalClockFunction() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    console.log(minutes + ":" + seconds);
    return minutes + ":" + seconds;
  }

  timeFormatter = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  modifySessionLength = (btn) => {
    if (this.state.timerRunning === false) {
      if (btn.target.value === "incrSes" && this.state.sessionLength < 60) {
        this.setState({ sessionLength: this.state.sessionLength + 1 }, () => {
          this.setState({
            timeToDisplay: this.digitalClockFunction(this.state.sessionLength),
            timer: this.state.sessionLength * 60
          });
        });
      } else if (
        btn.target.value === "decrSes" &&
        this.state.sessionLength > 1
      ) {
        this.setState({ sessionLength: this.state.sessionLength - 1 }, () => {
          this.setState({
            timeToDisplay: this.digitalClockFunction(this.state.sessionLength),
            timer: this.state.sessionLength * 60
          });
        });
      }
    }
  };

  modifyBreakLength = (btn) => {
    if (this.state.timerRunning === false) {
      if (btn.target.value === "incrBr" && this.state.breakLength < 60) {
        this.setState({ breakLength: this.state.breakLength + 1 });
      } else if (btn.target.value === "decrBr" && this.state.breakLength > 1) {
        this.setState({ breakLength: this.state.breakLength - 1 });
      }
    }
  };

  stopTimer() {
    clearInterval(this.timer);
    this.setState({ timerRunning: false });
    console.log("stop");
  }

  switchTimer() {
    this.setState({ timerRunning: !this.state.timerRunning });
  }

  startCountdown() {
    this.timeLeft = this.state.timer;

    this.timer = setInterval(() => {
      this.setState({
        timer: this.state.timer - 1,
        timeToDisplay: this.timeFormatter(this.state.timer)
      });
      this.timeLeft--;
      if (this.timeLeft < 0) {
        if (this.state.timerType === "In Session") {
          this.playAlarm();
          this.setState({
            timerType: "Break Time",
            timer: this.state.breakLength * 60
          });
          clearInterval(this.timer);
          this.startCountdown();
        } else {
          this.setState({
            timerType: "In Session",
            timer: this.state.sessionLength * 60
          });
          clearInterval(this.timer);
          this.startCountdown();
        }
      }
    }, 1000);
  }

  runTimer() {
    if (this.state.timerType === "In Session") {
      if (this.state.timerRunning === false) {
        this.startCountdown();
      } else {
        this.stopTimer();
      }
    } else if (this.state.timerType === "Break Time") {
      if (this.state.timerRunning === false) {
        this.startCountdown();
      } else {
        this.stopTimer();
      }
    }
  }

  startStopTimer() {
    if (this.state.bootState === true) {
      this.setState({ timerRunning: true, bootState: false });
    } else {
      this.switchTimer();
      this.runTimer();
      console.log(this.state.timerRunning + "switchtimer sonrasi");
    }
  }

  playAlarm() {
    soundToPlay.play();
  }

  stopAlarm() {
    soundToPlay.pause();
    soundToPlay.currentTime = 0;
  }

  resetTimer() {
    this.stopAlarm();
    this.stopTimer();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerRunning: false,
      timerType: "In Session",
      timer: 1500,
      timeToDisplay: `25:00`,
      bootstate: true
    });
  }

  render() {
    return (
      <Clock
        onClick={this.onButtonClick}
        breakLength={this.state.breakLength}
        sessionLength={this.state.sessionLength}
        timerType={this.state.timerType}
        timer={this.state.timer}
        digitalClockFunction={this.digitalClockFunction}
        timeToDisplay={this.state.timeToDisplay}
      />
    );
  }
}

export default App;
