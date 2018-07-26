import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from 'react-d3-tree';

class App extends Component {
  constructor(props){
    super(props);
    this.url='http://localhost:8080';
    this.state={
      treeData: [
        {
          name: 'no data',
          attributes: {
            studentName:'no data',
            id:'no data'
          }
        },
      ],
      median:{
        name:'Level 2: A',
        id:'no data'
      },
      size:3,
      minimum:{
        name:'Level 2: A',
        id:'no data'
      },
      max:{
        name:'Level 2: A',
        id:'no data'
      },
      search:{
        name:'No Data',
        id:'no data'
      },
      delete:{
        name:'no deleted',
        id:'no data'
      },
      inorder:['no data'],
      preorder:['no data'],
      postorder:['no data']
    }
  }

  componentWillMount(){
    fetch(`${this.url}/getree`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        treeData:[data]
      });
    }).catch(err=>{
      console.error(err);
    })
  }
  
  onRemoveNode(nodeData,evt){
    console.log(nodeData);
    fetch(`${this.url}/delete/${nodeData.attributes.id}`)
    .then(res=>res.json())
    .then(data=>{
      this.setState(
        {
          delete:data.deleted,
          treeData:[data.root]
        }
      );
    }).catch(err=>{
      console.error(err);
    })
  }
  
  getMax(){
    fetch(`${this.url}/maximum`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({max:data});
    }).catch(err=>{
      console.error(err);
    })
  }

  getMin(){
    fetch(`${this.url}/minimum`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({minimum:data});
    }).catch(err=>{
      console.error(err);
    })
  }

  getMedian(){
    fetch(`${this.url}/median`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({median:data});
    }).catch(err=>{
      console.error(err);
    })
  }

  getSize(){
    fetch(`${this.url}/size`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({size:data});
    }).catch(err=>{
      console.error(err);
    })
  }

  getInorder(){
    this.getOrder('in');  
  }


  getPostorder(){
    this.getOrder('post');  
  }

  getPreorder(){
    this.getOrder('pre');  
  }


  getOrder(order){
    fetch(`${this.url}/${order}order`)
    .then(res=>res.json())
    .then(data=>{
      let forUpdate={};
      forUpdate[`${order}order`]=data;
      this.setState(forUpdate);
    }).catch(err=>{
      console.error(err);
    })
  }

  search(){

  }

  insert(){

  }

  handleNameChange(event) {
    this.setState({nameToInsert: event.target.value});
  }

  handleIdChange(event) {
    this.setState({idToInsert: event.target.value});
  }

  handleSearchChange(event) {
    this.setState({idToSearch: event.target.value});
  }

  handleDeleteChange(event) {
    this.setState({idToDelete: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${this.url}/insertnode/${this.state.idToInsert}/${this.state.nameToInsert}`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        treeData:[data]
      });
    }).catch(err=>{
      console.error(err);
    })
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    fetch(`${this.url}/search/${this.state.idToSearch}`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        search:data
      });
    }).catch(err=>{
      console.error(err);
    })
  }

  handleDeleteSubmit(event) {
    event.preventDefault();
    fetch(`${this.url}/delete/${this.state.idToDelete}`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        delete:data.deleted,
        treeData:[data.root]
      });
    }).catch(err=>{
      console.error(err);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Wired Tree!</h1>
        </header>
        <p className="App-intro">
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <div>
            <div> last value for minium: {this.state.minimum.id}. <button onClick={this.getMin.bind(this)}>Request Again</button></div>
            <div> last value for maximum: {this.state.max.id}. <button onClick={this.getMax.bind(this)}>Request Again</button></div>
            <div> last value for median: {this.state.median.id}. <button onClick={this.getMedian.bind(this)}>Request Again</button></div>
            <div> last value for size: {this.state.size}. <button onClick={this.getSize.bind(this)}>Request Again</button></div>
            <div> last value for inorder: {this.state.inorder.join()}. <button onClick={this.getInorder.bind(this)}>Request Again</button></div>
            <div> last value for preorder: {this.state.preorder.join()}. <button onClick={this.getPreorder.bind(this)}>Request Again</button></div>
            <div> last value for postorder: {this.state.postorder.join()}. <button onClick={this.getPostorder.bind(this)}>Request Again</button></div>
          </div>
          <div>
          <form onSubmit={this.handleSubmit.bind(this)} style={{display:'flex',flexDirection:'column'}}>
            <label>
              Name:
              <input type="text" value={this.state.nameToInsert} onChange={this.handleNameChange.bind(this)} />
            </label>
            <label>
              Id:
              <input type="text" value={this.state.idToInsert} onChange={this.handleIdChange.bind(this)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
          <div>
          <form onSubmit={this.handleSearchSubmit.bind(this)} style={{display:'flex',flexDirection:'column'}}>
            <label>
              Search Node By Id:
              <input type="text" value={this.state.idToSearch} onChange={this.handleSearchChange.bind(this)} />
            </label>
            <input type="submit" value="Submit" />
            <div>search Id:{this.state.search ? this.state.search.id: ''} , search name {this.state.search ? this.state.search.name : ''}</div>
          </form>
          </div>
          <div>
          <form onSubmit={this.handleDeleteSubmit.bind(this)} style={{display:'flex',flexDirection:'column'}}>
            <label>
              Delete Node By Id(You Can Delete by clicking node too):
              <input type="text" value={this.state.idToDelete} onChange={this.handleDeleteChange.bind(this)} />
            </label>
            <input type="submit" value="Submit" />
            <div>delete Id:{this.state.delete ? this.state.delete.id : ''} ,delete name {this.state.delete ? this.state.delete.name:''}</div>
          </form>
          </div>
        </div>
        <div id="treeWrapper" style={{width: '1000em', height: '1000em',marginTop:'30px',marginLeft:'30px'}}>
           <Tree 
                onClick={this.onRemoveNode.bind(this)} 
                collapsible={false} 
                orientation={"vertical"} 
                data={this.state.treeData} />
        </div>

        </p>
      </div>
    );
  }
}

export default App;
