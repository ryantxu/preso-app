import React, { PureComponent } from 'react';
import { NavModelItem, AppRootProps } from '@grafana/data';
import { getLocationSrv } from '@grafana/runtime';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';

interface Props extends AppRootProps {}

const TAB_ID_B = 'intro';
const TAB_ID_C = 'mixed';

export class RootPage<PresoAppSettings> extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.updateNav();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.query !== prevProps.query) {
      if (this.props.query.tab !== prevProps.query.tab) {
        this.updateNav();
      }
    }
  }

  updateNav() {
    const { path, onNavChanged, query, meta } = this.props;

    const tabs: NavModelItem[] = [];
    tabs.push({
      text: 'Outline',
      //   icon: 'fa fa-fw fa-file-text-o',
      url: path,
      id: '',
    });
    // tabs.push({
    //   text: 'Intro',
    //   //    icon: 'fa fa-fw fa-file-text-o',
    //   url: path + '?tab=' + TAB_ID_B,
    //   id: TAB_ID_B,
    // });
    // tabs.push({
    //   text: 'Conclusion',
    //   //   icon: 'fa fa-fw fa-file-text-o',
    //   url: path + '?tab=' + TAB_ID_C,
    //   id: TAB_ID_C,
    // });

    // Set the active tab
    let found = false;
    const selected = query.tab;
    for (const tab of tabs) {
      tab.active = !found && selected === tab.id;
      if (tab.active) {
        found = true;
      }
    }
    if (!found) {
      tabs[0].active = true;
    }

    const node = {
      text: 'TNS pre-KubeCon / lightning demo',
      img: meta.info.logos.large,
      url: path,
      children: tabs,
    };

    // Update the page header
    onNavChanged({
      node: node,
      main: node,
    });
  }

  onClose = () => {
    getLocationSrv().update({
      query: {},
      replace: true,
    });
  };

  render() {
    const { query } = this.props;

    // Intro
    if (query.tab === TAB_ID_B) {
      const images = [
        {
          title: 'Ryan Mckinley',
          url: 'https://user-images.githubusercontent.com/705951/96523831-8a699100-122b-11eb-8bdf-26efeaa3c8d1.png',
        },
        {
          title: 'Monroe',
          url: 'https://user-images.githubusercontent.com/705951/96523882-abca7d00-122b-11eb-8921-1c2f8e0fdf81.png',
        },
        {
          title: 'FactoryTalk',
          url: 'https://user-images.githubusercontent.com/705951/96523911-bbe25c80-122b-11eb-8ce5-54f9809c3400.png',
        },
        {
          title: 'FactoryTalk 2',
          url: 'https://user-images.githubusercontent.com/705951/96523927-d3214a00-122b-11eb-8c9f-96a0cee9db7f.png',
        },
        {
          title: 'FactoryTalk to Grafana (#)',
          url: 'https://user-images.githubusercontent.com/705951/96524018-02d05200-122c-11eb-8de6-f50b99522ba6.png',
        },
        // {
        //   title: 'Webcam and status',
        //   url: 'https://user-images.githubusercontent.com/705951/96524069-18de1280-122c-11eb-8b58-657c09e6783d.png',
        // },
      ];

      return (
        <div>
          <Lightbox images={images} allowRotate={false} onClose={this.onClose} />
        </div>
      );
    }

    // Mixed
    if (query.tab === TAB_ID_C) {
      const images = [
        {
          title: 'Prometheus, Loki, ServiceNow',
          url: 'https://user-images.githubusercontent.com/705951/96526925-c1dc3b80-1233-11eb-9d06-071b2ecd734d.png',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96526699-35317d80-1233-11eb-9712-cadeec1f7f71.png',
          title: 'New Relic, DataDog, ServiceNow',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96539890-10e49980-1251-11eb-9d32-85f0653cc1f6.png',
          title: 'Plugins',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96539900-18a43e00-1251-11eb-955e-abe7663e81ab.png',
          title: 'Plugins',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96539921-222da600-1251-11eb-9a33-e9a3e298e226.png',
          title: 'Plugins',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96539936-2bb70e00-1251-11eb-973f-cf2bf8156f5e.png',
          title: 'Plugins',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96539958-3d001a80-1251-11eb-91f3-ddbfc5a9e55b.png',
          title: 'Plugins',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96539983-4be6cd00-1251-11eb-9495-078266548af9.png',
          title: 'Plugins',
        },
        {
          url: 'https://user-images.githubusercontent.com/705951/96540837-83567900-1253-11eb-87fc-8a7c262fa604.png',
          title: 'Enterprise Plugins',
        },
      ];

      return (
        <div>
          <Lightbox images={images} allowRotate={false} onClose={this.onClose} />
        </div>
      );
    }

    const includes = [
      {
        type: 'page',
        name: 'Introduction',
        path: '/a/ryantxu-preso-app/?tab=intro',
        sub: 'Perhaps not the grafana you are expecting to see.',
        addToNav: true,
        defaultNav: true,
      },
      {
        type: 'page',
        name: '1. Data Data Data Data',
        path: '/a/ryantxu-preso-app/?tab=mixed',
        sub: 'Keep your data where it already lives.  Grafana 7.0 has dramatically improved the plugin framework.',
        addToNav: true,
        defaultNav: true,
      },
      {
        type: 'page',
        name: '2. Transformations',
        path: '/d/l-rqPW4Mk/home-automation?orgId=1',
        sub: 'Enhance data source features in the browser',
        note: 'New in 7.0',
        addToNav: true,
        defaultNav: true,
      },
      {
        type: 'page',
        name: '3. Data driven configuration',
        path: '/d/r62wG-cMz/aqi-simple',
        sub: 'Define visualization properties from the data source... NoDB!',
        note: 'New in 7.0',
        addToNav: true,
        defaultNav: true,
      },
      {
        type: 'page',
        name: '4. Events & streaming',
        path: '/d/ei4Hwg5Mk/simple?orgId=1',
        sub: 'The data source can define the visualization properties',
        note: 'Alpha in 7.3',
        addToNav: true,
        defaultNav: true,
      },
      {
        type: 'page',
        name: 'Conclusion',
        path: '/d/UUMF2MpGz/g7-lightning-demo?orgId=1',
        sub: 'Composable observablity platform',
        addToNav: true,
        defaultNav: true,
      },
    ];

    return (
      <div>
        <section className="card-list-layout-list">
          <ol className="card-list">
            {includes.map(item => (
              <li className="card-item-wrapper" key={item.name}>
                <a className="card-item" href={item.path}>
                  <div className="card-item-header">
                    <div className="card-item-type">{item.note}</div>
                  </div>
                  <div className="card-item-body">
                    {/* <figure className="card-item-figure">
              <img src={dataSource.typeLogoUrl} alt={dataSource.name} />
            </figure> */}
                    <div className="card-item-details">
                      <div className="card-item-name">{item.name}</div>
                      <div className="card-item-sub-name">{item.sub}</div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    );
  }
}
