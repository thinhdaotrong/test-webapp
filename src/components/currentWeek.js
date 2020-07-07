import moment from 'moment';

let curr = new Date()
let currentWeek = []

for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i
    //   let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    let day = moment(curr.setDate(first)).format('YYYY-MM-DD')
    currentWeek.push(day)
}

export default currentWeek