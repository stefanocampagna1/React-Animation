import React, { Component } from "react"
import posed, { PoseGroup } from "react-pose"
import { easing, tween, spring } from "popmotion"
import animationTimings from "../common/animationTimings"

const GridProps = {
  enter: {
    x: 0,
    opacity: 1,
    // wait until grid has animated in before animating card children
    delayChildren: animationTimings.gridEnter,
    // stagger each child's animation
    staggerChildren: 80,
    transition: props => {
      // linearly animate opacity, otherwise use a springy transition
      if (props.keys === "opacity") {
        return tween({
          ...props,
          duration: animationTimings.gridEnter,
          ease: easing.linear
        })
      } else {
        return spring({
          ...props
        })
      }
    }
  },
  exit: {
    x: -1000,
    opacity: 0,
    afterChildren: true,
    staggerChildren: 50,
    transition: props => {
      if (props.keys === "opacity") {
        return tween({
          ...props,
          duration: animationTimings.gridLeave,
          ease: easing.linear
        })
      } else {
        return spring({
          ...props
        })
      }
    }
  }
}

const Grid = posed.ul(GridProps)

const itemProps = {
  enter: {
    y: 0,
    opacity: 1,
    transition: props =>
      spring({
        ...props
      })
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: props =>
      spring({
        ...props
      })
  }
}

const Item = posed.li(itemProps)

// use the "pose group" component to manage enter and exit transitions from the DOM
// https://popmotion.io/pose/api/posegroup/

const TransitionGrid = ({ in: open, items, removeItem }) => {
  return (
    <PoseGroup>
      {open && (
        <Grid className="grid animated-grid" key="grid">
          <PoseGroup>
            {items.map(item => (
              <Item className="card" key={item} onClick={() => removeItem(item)}>
                <div className="close-card">&#x2715;</div>
                <div>{item}</div>
              </Item>
            ))}
          </PoseGroup>
        </Grid>
      )}
    </PoseGroup>
  )
}

export default TransitionGrid
