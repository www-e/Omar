'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const nodes = [
  {
    id: 'User',
    label: 'User',
    type: 'root',
    connections: ['CareersProfile', 'EmployerProfile', 'CareersSubscription'],
  },
  {
    id: 'CareersProfile',
    label: 'CareersProfile',
    type: 'profile',
    connections: ['JobApplication'],
  },
  {
    id: 'EmployerProfile',
    label: 'EmployerProfile',
    type: 'profile',
    connections: ['JobPosting'],
  },
  {
    id: 'CareersSubscription',
    label: 'CareersSubscription',
    type: 'sub',
    connections: [],
  },
  {
    id: 'JobPosting',
    label: 'JobPosting',
    type: 'job',
    connections: ['JobApplication', 'JobBookmark'],
  },
  {
    id: 'JobApplication',
    label: 'JobApplication',
    type: 'application',
    connections: [],
  },
  {
    id: 'JobBookmark',
    label: 'JobBookmark',
    type: 'bookmark',
    connections: [],
  },
];

export default function DatabaseDiagram() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cg-fade', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderNode = (node) => {
    const isRoot = node.type === 'root';
    const isLeaf = node.connections.length === 0;

    return (
      <div key={node.id} className="cg-node-group cg-fade">
        <div className={`cg-node cg-node-${node.type} ${isRoot ? 'cg-node-root' : ''}`}>
          <span className="cg-node-id">{node.id}</span>
          <span className="cg-node-label">{node.label}</span>
        </div>

        {node.connections.length > 0 && (
          <div className="cg-node-children">
            <div className="cg-arrow-column">
              {node.connections.map((childId) => (
                <div key={childId} className="cg-arrow-wrap">
                  <span className="cg-arrow">←</span>
                  <span className="cg-arrow-label">{childId}</span>
                </div>
              ))}
            </div>
            <div className="cg-node-column">
              {node.connections.map((childId) => {
                const childNode = nodes.find((n) => n.id === childId);
                if (!childNode) return null;
                return (
                  <div key={childId} className="cg-node-child">
                    {renderNode(childNode)}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isLeaf && (
          <div className="cg-node-meta">
            <span className="cg-badge cg-badge-rose">leaf</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section ref={sectionRef} dir="rtl" className="cg-section cg-diagram">
      <div className="cg-container">
        <h2 className="cg-title cg-fade">مخطط قاعدة البيانات — ER Diagram</h2>
        <p className="cg-subtitle cg-fade">
          تمثيل بصري للعلاقات بين كيانات نظام التوظيف الرياضي.
        </p>

        <div className="cg-diagram-board cg-fade">
          <div className="cg-diagram-legend">
            <div className="cg-legend-item">
              <span className="cg-legend-dot cg-dot-root" />
              جذر — User
            </div>
            <div className="cg-legend-item">
              <span className="cg-legend-dot cg-dot-profile" />
              ملف شخصي — Profile
            </div>
            <div className="cg-legend-item">
              <span className="cg-legend-dot cg-dot-job" />
              وظيفة — Job
            </div>
            <div className="cg-legend-item">
              <span className="cg-legend-dot cg-dot-application" />
              طلب — Application
            </div>
            <div className="cg-legend-item">
              <span className="cg-legend-dot cg-dot-bookmark" />
              محفوظ — Bookmark
            </div>
          </div>

          <div className="cg-diagram-tree">
            {renderNode(nodes.find((n) => n.id === 'User'))}
          </div>
        </div>

        <div className="cg-card cg-fade cg-relationships-card">
          <h3 className="cg-card-title">العلاقات الرئيسية</h3>
          <ul className="cg-relationships-list">
            <li>
              <span className="cg-rel-dot cg-dot-root" />
              <strong>User</strong> يملك <span className="cg-rel-entity">CareersProfile</span>{' '}
              و <span className="cg-rel-entity">EmployerProfile</span> و{' '}
              <span className="cg-rel-entity">CareersSubscription</span>
            </li>
            <li>
              <span className="cg-rel-dot cg-dot-profile" />
              <strong>EmployerProfile</strong> ينشر <span className="cg-rel-entity">JobPosting</span>
            </li>
            <li>
              <span className="cg-rel-dot cg-dot-profile" />
              <strong>CareersProfile</strong> يقدم <span className="cg-rel-entity">JobApplication</span>
            </li>
            <li>
              <span className="cg-rel-dot cg-dot-job" />
              <strong>JobPosting</strong> يستقبل <span className="cg-rel-entity">JobApplication</span>{' '}
              و <span className="cg-rel-entity">JobBookmark</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
