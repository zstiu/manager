import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateAction } from '../actions'
// import Manager from '../components/Manager'
import Update from '../components/Update'
// import zip from 'lodash/zip'
// import './dist/Login.css'


class UpdateInfoPage extends Component {
  static propTypes = {
    manager: PropTypes.object,
  }


  render() {
      const { manager, users } = this.props
      return (<div>
      <Update fetchUpdate={this.props.fetchUpdate} manager={manager} users={users} />
      </div>
      )
  }
}
    // const { starredRepos, starredRepoOwners, starredPagination } = this.props


    const mapStateToProps = (state) => {


        return {
            manager: state.manager,
            users: state.users.userList
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
                // handelChange: () => getManager("测试3", "123456")(dispatch)
                fetchUpdate: (id, name, email, phone) => {
                    updateAction(id, name, email, phone)(dispatch);
                    // browserHistory.push(`/manager`)
                    }
            }
        }

// Action Creator
// const increaseAction = { type: 'increase' }

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateInfoPage)
