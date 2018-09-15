import { Repeater, Link, getRandomNumberWithProbability, convertStringToBinary, QuantumNetwork } from '../lib'
import React, { Component } from 'react';
var cytoscape = require('cytoscape');

export class Vis extends Component {
  dothing(){
    const r1 = new Repeater('Repeater1', 4, 1)
    const r2 = new Repeater('Repeater2', 4, 2)
    const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(4), 1)

    //debugger

    var container =  this.refs.test
    //debugger
    //container.style.height = '100vh'

    var cy = cytoscape({
      
      container, // container to render in

      elements: [ // list of graph elements to start with
        { // node a
          data: { id: r1.getName() }
        },
        { // node b
          data: { id: r2.getName()  }
        },
        { // edge ab
          data: { id: l1.getName() , source: l1.getSource().getId(), target: l1.getTarget().getId() }
        }
      ],

      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(id)'
          })
        .selector('edge')
          .css({
            
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
          })
        .selector('.highlightEdge')
          .css({
            'curve-style': 'bezier',
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
          })
        .selector('.highlightNode')
          .css({
            'background-color': '#61bffc',
            'transition-property': 'background-color',
            'transition-duration': '0.5s'
          }) ,

      layout: {
        name: 'grid',
        rows: 4
      }
    });
    //cy.getElementById(r1.getId()).addClass('highlighted')
    cy.getElementById(l1.getName()).addClass('highlightEdge')
    cy.getElementById(r1.getId()).addClass('highlightNode')

    // var eles = cy.add([
    //   { group: "edges", data: { id: l11.getId(), source: l11.getSource().getId(), target: l11.getTarget().getId() } }
    // ]);
    // cy.forceRender()
    //repeaters.forEach(repeater => cy.add([{ group: "nodes", data: { id: repeater.getId() } }]))
    //links.forEach(link => cy.add([{ group: "edges", data: { id: link.getName(), source: link.getSource().getId(), target: link.getTarget().getId() } }]))

  }



  render() {
    return (
      <div className="test" id="test" ref="test">
        {this.dothing()}
        
      </div>
    );
  }
}




// const r1 = new Repeater('Repeater1', 4, 1)
// const r2 = new Repeater('Repeater2', 4, 2)
// const r3 = new Repeater('Repeater3', 4, 3)
// const r4 = new Repeater('Repeater4', 4, 4)
// const r5 = new Repeater('Repeater5', 4, 5)
// const r6 = new Repeater('Repeater6', 4, 6)
// const r7 = new Repeater('Repeater7', 4, 7)
// const r8 = new Repeater('Repeater8', 4, 8)
// const r9 = new Repeater('Repeater9', 4, 9)
// const r10 = new Repeater('Repeater10', 4, 10)
// const r11 = new Repeater('Repeater11', 4, 11)
// const r12 = new Repeater('Repeater12', 4, 12)
// const r13 = new Repeater('Repeater13', 4, 13)
// const r14 = new Repeater('Repeater14', 4, 14)
// const r15 = new Repeater('Repeater15', 4, 15)
// const r16 = new Repeater('Repeater16', 4, 16)
// const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(4), 1)
// const l2 = new Link(r2, r3, r2.getQM(2), r3.getQM(4), 2)
// const l3 = new Link(r3, r4, r3.getQM(2), r4.getQM(4), 3)
// const l4 = new Link(r5, r6, r5.getQM(2), r6.getQM(4), 4)
// const l5 = new Link(r6, r7, r6.getQM(2), r7.getQM(4), 5)
// const l6 = new Link(r7, r8, r7.getQM(2), r8.getQM(4), 6)
// const l7 = new Link(r9, r10, r9.getQM(2), r10.getQM(4), 7)
// const l8 = new Link(r10, r11, r10.getQM(2), r11.getQM(4), 8)
// const l9 = new Link(r11, r12, r11.getQM(2), r12.getQM(4), 9)
// const l10 = new Link(r13, r14, r13.getQM(2), r14.getQM(4), 10)
// const l11 = new Link(r14, r15, r14.getQM(2), r15.getQM(4), 11)
// const l12 = new Link(r15, r16, r15.getQM(2), r16.getQM(4), 12)
// const l13 = new Link(r1, r5, r1.getQM(3), r5.getQM(1), 13)
// const l16 = new Link(r4, r8, r4.getQM(3), r8.getQM(1), 16)
// const l14 = new Link(r2, r6, r2.getQM(3), r6.getQM(1), 14)
// const l15 = new Link(r3, r7, r3.getQM(3), r7.getQM(1), 15)
// const l17 = new Link(r5, r9, r5.getQM(3), r9.getQM(1), 17)
// const l18 = new Link(r6, r10, r6.getQM(3), r10.getQM(1), 18)
// const l19 = new Link(r7, r11, r7.getQM(3), r11.getQM(1), 19)
// const l20 = new Link(r8, r12, r8.getQM(3), r12.getQM(1), 20)
// const l21 = new Link(r9, r13, r9.getQM(3), r13.getQM(1), 21)
// const l22 = new Link(r10, r14, r10.getQM(3), r14.getQM(1), 22)
// const l23 = new Link(r11, r15, r11.getQM(3), r15.getQM(1), 23)
// const l24 = new Link(r12, r16, r12.getQM(3), r16.getQM(1), 24)


// // TODO: Should message be called packet? Is it actually a packet? ( it kinda is, but at the same time not exactly)
// // TODO: BUG: So, I found this problem that this algorithm will even go through the paths that cant even reach the target! :(



// var cytoscape = require('cytoscape');

// var container =  document.getElementById('test')
// //debugger
// container.style.height = '100vh'

// var cy = cytoscape({
  
//   container, // container to render in

//   elements: [ // list of graph elements to start with
//     { // node a
//       data: { id: r1.getName() }
//     },
//     { // node b
//       data: { id: r2.getName()  }
//     },
//     { // node a
//       data: { id: r3.getName()  }
//     },
//     { // node b
//       data: { id: r4.getName()  }
//     },
//     { // node a
//       data: { id: r5.getName() }
//     },
//     { // node b
//       data: { id: r6.getName() }
//     },
//     { // node a
//       data: { id: r7.getName() }
//     },
//     { // node b
//       data: { id: r8.getName() }
//     },
//     { // node a
//       data: { id: r9.getName() }
//     },
//     { // node b
//       data: { id: r10.getName() }
//     },
//     { // node a
//       data: { id: r11.getName() }
//     },
//     { // node b
//       data: { id: r12.getName() }
//     },
//     { // node a
//       data: { id: r13.getName() }
//     },
//     { // node b
//       data: { id: r14.getName() }
//     },
//     { // node a
//       data: { id: r15.getName() }
//     },
//     { // node b
//       data: { id: r16.getName() }
//     },
//     { // edge ab
//       data: { id: l1.getName() , source: l1.getSource().getId(), target: l1.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l2.getName() , source: l2.getSource().getId(), target: l2.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l3.getName() , source: l3.getSource().getId(), target: l3.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l4.getName() , source: l4.getSource().getId(), target: l4.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l5.getName() , source: l5.getSource().getId(), target: l5.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l6.getName() , source: l6.getSource().getId(), target: l6.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l7.getName() , source: l7.getSource().getId(), target: l7.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l8.getName(), source: l8.getSource().getId(), target: l8.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l9.getName(), source: l9.getSource().getId(), target: l9.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l10.getName(), source: l10.getSource().getId(), target: l10.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l11.getName(), source: l11.getSource().getId(), target: l11.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l12.getName(), source: l12.getSource().getId(), target: l12.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l13.getName(), source: l13.getSource().getId(), target: l13.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l14.getName(), source: l14.getSource().getId(), target: l14.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l15.getName(), source: l15.getSource().getId(), target: l15.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l16.getName(), source: l16.getSource().getId(), target: l16.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l17.getName(), source: l17.getSource().getId(), target: l17.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l18.getName(), source: l18.getSource().getId(), target: l18.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l19.getName(), source: l19.getSource().getId(), target: l19.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l20.getName(), source: l20.getSource().getId(), target: l20.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l21.getName(), source: l21.getSource().getId(), target: l21.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l22.getName(), source: l22.getSource().getId(), target: l22.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l23.getName(), source: l23.getSource().getId(), target: l23.getTarget().getId() }
//     },
//     { // edge ab
//       data: { id: l24.getName(), source: l24.getSource().getId(), target: l24.getTarget().getId() }
//     },
//   ],

//   style: cytoscape.stylesheet()
//     .selector('node')
//       .css({
//         'content': 'data(id)'
//       })
//     .selector('edge')
//       .css({
        
//         'target-arrow-shape': 'triangle',
//         'width': 4,
//         'line-color': '#ddd',
//         'target-arrow-color': '#ddd'
//       })
//     .selector('.highlightEdge')
//       .css({
//         'curve-style': 'bezier',
//         'background-color': '#61bffc',
//         'line-color': '#61bffc',
//         'target-arrow-color': '#61bffc',
//         'transition-property': 'background-color, line-color, target-arrow-color',
//         'transition-duration': '0.5s'
//       })
//     .selector('.highlightNode')
//       .css({
//         'background-color': '#61bffc',
//         'transition-property': 'background-color',
//         'transition-duration': '0.5s'
//       }) ,

//   layout: {
//     name: 'grid',
//     rows: 4
//   }
// });
// //cy.getElementById(r1.getId()).addClass('highlighted')
// cy.getElementById(l1.getName()).addClass('highlightEdge')
// cy.getElementById(l2.getName()).addClass('highlightEdge')
// cy.getElementById(r1.getId()).addClass('highlightNode')

// // var eles = cy.add([
// //   { group: "edges", data: { id: l11.getId(), source: l11.getSource().getId(), target: l11.getTarget().getId() } }
// // ]);
// // cy.forceRender()
// //repeaters.forEach(repeater => cy.add([{ group: "nodes", data: { id: repeater.getId() } }]))
// //links.forEach(link => cy.add([{ group: "edges", data: { id: link.getName(), source: link.getSource().getId(), target: link.getTarget().getId() } }]))

