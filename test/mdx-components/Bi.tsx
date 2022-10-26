import React, { useState, useEffect } from 'react'

interface DemoProps {
  bid: any
}

const Demo = ({bid}: DemoProps) => {

  return (
    <div
      align="center"
      style={{
        position: relative,
        width: '100%',
        height: 0,
        paddingBottom: '75%',
      }}
    >
      <iframe
        style={{
          position: absolute,
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
        src=`//player.bilibili.com/player.html?bvid=${bid}&page=1&high_quality=1&danmaku=0`
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      ></iframe>
    </div>
  )
}

export default Demo
