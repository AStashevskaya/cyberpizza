import React from 'react'

const Navigation = (props) => {
  const image =
    props.children &&
    props.children.find(
      (block) => block.props.block.component && block.props.block.component.name === 'Image'
    )

  const links = props.links || []
  console.log(props)
    return (
    <nav style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="logo">
        <a href="/">{image}</a>
      </div>
      <div className="links">
        {links.map((link) => {
          console.log(link)
          return (
            <a href={link.data.url} key={link.data.labe}>
              {link.data.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation
