<template>
  <div id="mango-tree">
    <img src="./../assets/mango.png">
    <h1><span>{{ msg }} to your</span><br/>mangotree</h1>
    <md-whiteframe md-elevation="5">
      <p>Age<br/><span>{{mangoTreeObject.age }}</span> hours</p>
      <p>Height<br/><span>{{mangoTreeObject.height }}</span> centimeters</p>
      <p>Maturity<br/><span>{{ mangoTreeObject.isMature ? 'Mature' : 'Not Yet' }}</span></p>
      <p>Health Status<br/><span>{{mangoTreeObject.healthStatus ? 'Healthy' : 'Died' }}</span></p>
      <p>Fruits<br/><span>{{mangoTreeObject.fruits }}</span></p>
      <p>Harvested Fruits<br/><span>{{mangoTreeObject.harvestedFruits}}</span></p>
      
      <div id="actions">
        <md-button class="action md-raised md-accent" @click="signout">Sign Out</md-button>
        <md-button class="action md-raised md-accent" @click="harvest">Harvest</md-button>
        <md-button class="action md-raised md-accent" @click="reset">Reset</md-button>
      </div>
    </md-whiteframe>    
    <md-snackbar md-position="top center" ref="snackbar" md-duration="5000" @close="resetSnack">
      <span>{{ snackmsg }}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import MangoTree from './../mango_tree/mango-tree'

export default {
  name: 'Home',
  data () {
    return {
      username: this.$user.displayName,
      snackmsg: ''
    }
  },
  firebase () {
    return {
      mangoTree: this.$db.ref('/users/' + this.$user.uid)
    }
  },
  methods: {
    signout: function () {
      firebase.auth().signOut()
      .then(() => {
        Vue.prototype.$user = null
        this.$router.replace('signin')
      })
    },
    snack (msg) {
      this.snackmsg = msg
      this.$refs.snackbar.open()
    },
    resetSnack () {
      this.snackmsg = ''
    },
    harvest () {
      let currentHarvestedFruits = this.mangoTreeObject.harvestedFruits
      let currentFruits = this.mangoTreeObject.fruits

      if (currentFruits > 0) {
        let harvested = Math.round(Math.random() * (this.mangoTreeObject.fruits - 1) + 1)
        let rottenFruits = Math.round((Math.random() * (harvested - 1) + 1) * 0.3)
        let freshFruitsHarvested = harvested - rottenFruits

        this.$db.ref('/users/' + this.$user.uid)
        .child('harvestedFruits')
        .set(currentHarvestedFruits += freshFruitsHarvested)

        this.$db.ref('/users/' + this.$user.uid)
        .child('fruits')
        .set(currentFruits -= harvested)

        this.snack(`You got ${harvested} fruits harvested, ${freshFruitsHarvested} are fresh and added to your Harvested Fruits record, ${rottenFruits} are rotten`)
      } else {
        this.snack(`You have no fruits to harvest!`)
      }
    },
    reset () {
      const newMangoTree = MangoTree.create()
      this.$db.ref('/users/' + this.$user.uid).set(newMangoTree)
    }
  },
  computed: {
    msg () {
      return `Welcome ${this.username}`
    },
    mangoTreeObject () {
      let shownDetails = ['age', 'fruits', 'harvestedFruits', 'healthStatus', 'height', 'isMature']
      return this.mangoTree
      .filter(prop => shownDetails.indexOf(prop['.key']) !== -1)
      .reduce((obj, cur) => {
        let key = cur['.key']
        let value = cur['.value']
        obj[key] = value
        return obj
      }, {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mango-tree {
  background: linear-gradient(219deg, #22df21, #f97b00, #f900e5, #00cbf9, #00f935);
  background-size: 1000% 1000%;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  -webkit-animation: AnimationName 34s ease infinite;
  -moz-animation: AnimationName 34s ease infinite;
  -o-animation: AnimationName 34s ease infinite;
  animation: AnimationName 34s ease infinite;
}

#mango-tree img {
  width: 24px;
}

#mango-tree h1 {
  font-size: 48px;
  line-height: 28px;
  color: #FAFAFA;
  margin-bottom: 32px;
  text-align: center;
  margin-top: 0px;
}

#mango-tree h1 span {
  font-size: 16px;
}

.md-whiteframe {
  background: rgba(255, 255, 255, 0.78);
  padding: 32px;
  border-radius: 3px;
}

.md-whiteframe p {
  font-size: 12px;
}

.md-whiteframe p span {
  margin-left: 32px;
  font-size: 24px;
  letter-spacing: 2px;
  color: #FF5722!important;
}

.action {
  background-color: #FF5722!important; 
  border-radius: 100px;
}

#actions {
  width: 100%;
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

@-webkit-keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
@-o-keyframes AnimationName {
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
@keyframes AnimationName { 
    0%{background-position:0% 48%}
    50%{background-position:100% 53%}
    100%{background-position:0% 48%}
}
</style>
