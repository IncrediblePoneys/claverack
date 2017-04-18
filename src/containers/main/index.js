import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Timeline from '../timeline'
import { saveLayout as saveLayoutAction } from '../../actions/config'

import Styles from './styles'

const components = {
  timeline: Timeline
}

class Main extends Component {

  componentDidMount() {
    const { layout, currentAccount, saveLayout } = this.props
    if (layout.length === 0 && currentAccount) {
      saveLayout([{
        component: 'timeline',
        type: 'home',
        accountUrl: currentAccount.user.url
      }])
    }
  }

  render () {
    let columns = []
    this.props.layout.map(column => {
      const Component = components[column.component]
      columns.push(<Component {...column} />)
    })

    return <main style={Styles.main}>
      {columns}
    </main>
  }
}

Main.propTypes = {
  currentAccount: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { selected, accounts } = state.users

  return {
    layout: state.config.layout,
    currentAccount: accounts[selected]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveLayout : (layout) => {
      return dispatch(saveLayoutAction(layout))
    }
  }
}

const translated = translate()(Main)
const connected = connect(mapStateToProps, mapDispatchToProps)(translated)
const routed = withRouter(connected)

export default routed