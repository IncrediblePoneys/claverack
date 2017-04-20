import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import Tootlist from '../../components/tootlist'
import { timeline } from '../../utils/api'
import { accountUrlToInstanceUrl } from '../../utils/parser'
import { addToots as addTootsAction } from '../../actions/toots'

class Timeline extends Component {
  componentDidMount() {
    this.fetchToots()
    this.interval = window.setInterval(this.fetchToots.bind(this), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  async fetchToots () {
    const { account, type, addToots } = this.props
    addToots(await timeline(account.oauth, type), type, account.user.url)
  }

  render () {
    return <Tootlist toots={this.props.toots} name={this.props.type} />
  }
}

Timeline.propTypes = {
  accountUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { accountUrl } = ownProps
  const toots = (state.timelines[accountUrl] && ownProps.type && state.timelines[accountUrl][ownProps.type]) || []
  return {
    account: state.users.accounts[accountUrl],
    toots: toots.map(toot => state.toots[accountUrlToInstanceUrl(accountUrl)].get(toot))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToots : (toots, timeline, accountUrl) => {
      return dispatch(addTootsAction(toots, timeline, accountUrl))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
