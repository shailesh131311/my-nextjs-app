import { whyItems } from '../data/whyItems'

export default function WhyBookDirect() {
  return (
    <div className="why-bar">
      <div className="containerWrapper">
        <div className="why-inner">
          {whyItems.map((item) => (
            <div className="why-item" key={item.id}>
              <i className={`fa ${item.icon}`}></i>
              <div className="why-text-wrap">
                <div className="why-title">{item.title}</div>
                <div className="why-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
