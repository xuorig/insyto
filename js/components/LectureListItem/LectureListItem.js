import 'babel/polyfill';
import styles from './LectureListItem.css';

class LectureListItem extends React.Component {
  render() {
    return (
      <div className={styles.lecture}>
        <div className={styles.lecture__heading}>
          <div className={styles['lecture__heading--name']}><a href="#">{this.props.lecture.name} - {this.props.lecture.description}</a></div>
          <div className={styles['lecture__heading--date']}>September 28th 2015</div>
        </div>
        <div className={styles.lecture__body}>
          <p>Senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(LectureListItem, {
  fragments: {}
});
