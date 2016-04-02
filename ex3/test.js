// const cluster = require('cluster');

// if (cluster.isMaster) {
//   console.log('I am master');
// 	var worker1 = cluster.fork(),
// 			worker2 = cluster.fork()
// } else if (cluster.worker.id === 1) {
// 	var pid_1 = process.pid
//   console.log(`I am worker #${cluster.worker.id} and pid is ${pid_1}`)
// }	else {
// 	var pid_2 = process.pid
//   console.log(`I am worker #${cluster.worker.id} and pid is ${pid_2}`)
//   process.kill(pid_2)
// }
// if(cluster.isWorker){
// 	console.log(`### ${cluster.worker.id}`)
// }

