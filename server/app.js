'use strict'

const admin = require('firebase-admin');
const CronJob = require('cron').CronJob;
const serviceAccount = require('./sak-firebase-mango-tree.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mango-tree-3ddf7.firebaseio.com'
});

const db = admin.database();
const ref = db.ref('/users/');

const grow = (tree) => {
  if (tree.age < tree.maxAge) tree.age += 1
  else tree.healthStatus = false
  if (tree.height < tree.maxHeight) tree.height += 1
  if (!tree.isMature && tree.age === tree.matureAge) tree.isMature = true
  if (tree.isMature) tree.fruits += Math.floor(Math.random() * (tree.maxFruits + 1))

  return tree;
}

const job = new CronJob('0 * * * *', function() {
  ref.once('value', trees => {
    trees = trees.val();
    for (let user in trees) {
      let tree = trees[user]
      let updatedTree;

      if (tree.healthStatus) updatedTree = grow(tree)
      else updatedTree = tree

      ref.child(user).set(updatedTree)
    }
  });
}, null, true, 'America/Los_Angeles');

job.start();

