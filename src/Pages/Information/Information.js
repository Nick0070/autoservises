
import './Information.scss';
import React from 'react';

export const Information = () => {
    return (
      <div className="partners">
					<div className="container">
							<div className="partners__container">
									<div className="partners__list">
											<div className="partners__item-wrapper" >
													<a className="partners__item"> <img src="/Image/1log.jpg" className='logo'/> </a>
											</div>

											<div className="partners__item-wrapper" >
													<a className="partners__item"> <img src="/Image/2log.jpg" className='logo'/> </a>
											</div>

											<div className="partners__item-wrapper" >
													<a className="partners__item"> <img src="/Image/3log.jpg" className='logo'/> </a>
											</div>

											<div className="partners__item-wrapper" >
													<a className="partners__item"> <img src="/Image/4log.jpg" className='logo'/> </a>
											</div>
									 </div>
									</div>
								</div>
				</div>
    );
}
