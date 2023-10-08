import "./styles.css";

//Reduce

// Array.prototype.myReduce= function(callbackFn, initialValue) {
//     if (typeof callback !== "function") {
//     throw new Error("error");
//   }
//   var accumulator = initialValue;
// for (var i = 0; i < this.length; i++) {
//     if (accumulator !== undefined) {
//       accumulator = callbackFn.call(undefined, accumulator, this[i], i, this);
//     } else {
//       accumulator = this[i];
//     }
//   }
//   return accumulator;
// }

// var prod = [1, 2, 3].myReduce((prod, value) => {
//   return prod * value;
// });
// console.log(prod);

// Filter
// Array.prototype.myFilter = function(callbackFn) {
//     if (typeof callbackFn !== "function") {
//     throw new Error("Callback not defined");
//   }
//   if (this === null) {
//     throw new Error("Array not defined");
//   }
//   var arr = [];     
//   for (var i = 0; i < this.length; i++) {
//     if (callbackFn.call(this, this[i], i, this)) {
//       arr.push(this[i]);
//     }
//   }
//   return arr;
// }

// var prod = [1, 2, 3].myFilter((value) => {
//   return value !== 2;
// });
// console.log(prod);

// Map
// Array.prototype.myMap = function(callbackFn) {
  //   if (typeof callbackFn !== "function") {
//     throw new Error("Callback not defined");
//   }
//   if (this === null) {
//     throw new Error("Array not defined");
//   }
//   var arr = [];              
//   for (var i = 0; i < this.length; i++) { 
//      /* call the callback function for every value of this array and       push the returned value into our resulting array
//      */
//     arr.push(callbackFn(this[i], i, this));
//   }
//   return arr;
// }
// var prod = [1, 2, 3].myMap((value) => {
//   return value * 2;
// });
// console.log(prod);

//Call
// Function.prototype.myCall = function (obj = {}, ...args) {
//   if (typeof this !== "function") {
//     throw new Error("function not defined");
//   }
//   obj.fn = this;
//   obj.fn(...args);
// };

// function ab(val1) {
//   console.log(this.value, val1);
// }
// ab.myCall({ value: 123 });

//Apply
// Function.prototype.myApply = function (obj = {}, args) {
//   if (typeof this !== "function") {
//     throw new Error("function not defined");
//   }
//   if (!Array.isArray(args)) {
//     throw new Error("Args should be an array");
//   }
//   obj.fn = this;
//   obj.fn(...args);
// };

// function ab(val1, val2) {
//   console.log(this.value, val1, val2);
// }
// ab.myApply({ value: 123 }, [1, 2]);

//Bind
// Function.prototype.myBind = function (obj = {}, ...args) {
//   if (typeof this !== "function") {
//     throw new Error("function not defined");
//   }
//   obj.fn = this;
//   return function () {
//     return obj.fn(...args);
//   };
// };

// function ab(val1, val2) {
//   console.log(this.value, val1, val2);
// }
// var fn = ab.myBind({ value: 321 }, 1, 2);
// fn();

//Object.create

// Object.prototype.myCreate = function (proto, props) {
//   function F() {}
//   F.prototype = proto;
//   if (typeof props === "object") {
//     for (var item in props) {
//       if (props.hasOwnProperty(item)) {
//         F[item] = props[item];
//       }
//     }
//   }
//   return new F();
// };

// var abc = Object.myCreate({ a: 123 });
// abc.b = 2;
// console.log("abc", abc);


// var subscriber = [];
// function subscribe(eventName, callback, id) {
//   if (!subscriber[eventName]) {
//     subscriber[eventName] = [];
//   }
//   subscriber[eventName].push({ id, callback });
// }

// function unsubscribe(eventName, id) {
//   if (subscriber[eventName]) {
//     subscriber[eventName] = subscriber[eventName].filter((evtObj) => {
//       return evtObj.id !== id;
//     });
//   }
// }


// function publishData(eventName, data) {
//   if (subscriber[eventName]) {
//     var publishTo = subscriber[eventName] || [];
//     publishTo.map((callbackObj) => {
//       callbackObj.callback(data);
//     });
//   }
// }

var ReduxContext  = React.createContext('redux');
class Connect extands React.Component {
  constructor(props) {
    super(props);
    this.state = props.store.getState();
  }
 
  componentDidMount() {
    this.props.store.subscribe((state) => {
      this.setState(state)
    })
  }
  
  render() {
    const { store } = this.props;
    return (<WrappedComponent 
      {...this.props} 
      {...mapStateToProps(store.getState())} 
      {...mapDispatchToProps(store.dispatch)}  
      />)
  }
}
const connect =  (mapStateToProps, mapDispatchToProps) => WrappedComponent => {

 return (props) =>  (
   <ReduxContext.Consumer>
     {store => <Connect {...props} store={store}></Connect>}
     </ReduxContext.Consumer>
 )


 }
  
