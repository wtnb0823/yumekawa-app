<template>
  <div>
    <div class="top">
    <div class="resultTitle">Result</div>
    <div class="resultComment">あなたの陽キャ度は...</div>
    <div class="Youkyado">{{ totalYoukyado }}</div>
    <div class="bunmatsu">です！！！</div>
    </div>
    <div v-if="this.totalYoukyado <= 20" class="result">
      ほとんど陰キャ！
      <div class="sentence">
        あなたはもう救いようのない陰キャです。あきらめましょう。
      </div>
    </div>
    <div v-else-if="this.totalYoukyado <= 40" class="result">
      ちょっと陽キャ！
      <div class="sentence">
        あなたはまだまだ陽キャとはほど遠い存在です。精進しましょう。
      </div>
    </div>
    <div v-else-if="this.totalYoukyado <= 60" class="result">
      まあまあ陽キャ！
      <div class="sentence">
        あなたは言っても平凡です。何もかもが普通でつまらないでしょう。
      </div>
    </div>
    <div v-else-if="this.totalYoukyado <= 80" class="result">
      かなりの陽キャ！
      <div class="sentence">
        完全なる陽キャにギリギリなれない惜しい人です。中途半端はやめましょう。
      </div>
    </div>
    <div v-else-if="this.totalYoukyado > 80" class="result">
      完全なる陽キャ！
      <div class="sentence">
        人生がさぞ楽しいことでしょう。その楽しさをぜひ皆に分け与えてください。
      </div>
    </div>
    <div class="restart">
      <button v-on:click="youkyadoreset()">
        <router-link to="/select/0">もう一度診断する</router-link>
      </button>
    </div>
  <div class="ranking">
    <div class="rankingComment">名前を入力してランキングに追加しよう！</div>
    <input type="text" class="inputText" v-model="inputName" /><input
      type="button"
      value="追加"
      class="addButton"
      v-on:click="rankingButton"
    />
  </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      inputName: "",
    }
  },
  methods: {
    rankingButton: function () {
      const data = {
        name: this.inputName,
        youkyado: this.totalYoukyado,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
      firebase.firestore().collection("ranking").add(data)
      this.inputName = ""
    },
    youkyadoreset: function () {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].answer[0].selected === true) {
          this.questions[i].answer[0].selected = false
        }
        if (this.questions[i].answer[1].selected === true) {
          this.questions[i].answer[1].selected = false
        }
        if (this.questions[i].answer[2].selected === true) {
          this.questions[i].answer[2].selected = false
        }
      }
    },
  },
  computed: {
    totalYoukyado: function () {
      let youkyadoCmp = 0
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].answer[0].selected === true) {
          youkyadoCmp += this.questions[i].answer[0].rate
        }
        if (this.questions[i].answer[1].selected === true) {
          youkyadoCmp += this.questions[i].answer[1].rate
        }
        if (this.questions[i].answer[2].selected === true) {
          youkyadoCmp += this.questions[i].answer[2].rate
        }
      }
      return youkyadoCmp
    },
  },
}
</script>

<style scoped>
.top {
  background: -moz-linear-gradient(#ffb03c, #7d0c8b);
  background: -webkit-linear-gradient(#ffb03c, #ff708d);
  background: linear-gradient(to right, #ffb03c, #ff708d);
  border-radius: 10vh;
}
.resultTitle {
  color: #FFF;
  height: 20px;
  font-family: 'Kaisei Decol', serif;
  padding-top: 30px;
  font-size: 40px;
  font-weight: bold;
}
.resultComment {
  display: flex;
  align-items: left;
  padding: 40px;
  text-align: left;
  font-family: 'Kaisei Decol', serif;
  font-size: 30px;
  color: #FFF;
}
.Youkyado {
  padding-bottom: 40px;
  height: 10rem;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Rampart One', cursive;
  font-size: 200px;
  font-weight: bold;
}
.bunmatsu {
  padding: 40px;
  text-align: right;
  font-family: 'Kaisei Decol', serif;
  font-size: 30px;
  color: #FFF;
}
.result {
  height: 180px;
  margin: 20px;
  padding-top: 30px;
  font-size: 50px;
  color: red;
  text-align: center;
  font-family: 'Kaisei Decol', serif;
  border: solid 9px #000000;
}
.sentence {
  color: black;
  text-align: center;
  font-size: 30px;
  font-family: 'Kaisei Decol', serif;
}
.restart {
  position: absolute;
  top: 790px;
  right: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-family: 'DotGothic16', sans-serif;
  color: gold;
  background-color:rgb(104, 86, 86);
  border-radius: 50vh;
  height: 5rem;
  width: 20rem;
  transition: 0.2s;
}
.restart:hover {
  color:rgb(255, 255, 255);
  background-color: rgb(0, 0, 0);
}
.ranking {

}
</style>
