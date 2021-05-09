import './docs.scss';

import React from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';

const DocsPage = () => (
  <ScrollPanel style={{width: '100%', height: '800px'}}  className="custom">
    <iframe src="../swagger-ui/index.html" width="100%" height="3816.8px" title="Swagger UI" seamless style={{ border: 'none', overflow: 'hidden' }} />
  </ScrollPanel>
);

export default DocsPage;
