import React, { useState } from "react";
import "./SAPSection.css";

const sampleXML = `<ClinicalDocument>
  <patient>
    <name>John Doe</name>
    <id>12345</id>
    <dob>1980-01-01</dob>
    <diagnosis>Hypertension</diagnosis>
    <medications>
      <medication>
        <name>Lisinopril</name>
        <dose>10mg</dose>
        <frequency>Once daily</frequency>
      </medication>
    </medications>
  </patient>
  <metadata>
    <author>Dr. Jane Smith</author>
    <date>2025-07-22</date>
    <system>SAP Clinical Module</system>
  </metadata>
</ClinicalDocument>`;

// Syntax highlight XML with escape and span classes for colors
function syntaxHighlight(xml) {
  if (!xml) return "";
  return xml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/("(.*?)")/g, '<span class="xml-attr">$1</span>')
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="xml-comment">$1</span>')
    .replace(/(&lt;\/?[\w:-]+&gt;)/g, '<span class="xml-tag">$1</span>');
}

// Glossary entries
const glossary = [
  {
    term: "HL7 CDA",
    definition: "Health Level Seven Clinical Document Architecture - a standard for exchanging clinical documents in XML."
  },
  {
    term: "FHIR XML",
    definition: "Fast Healthcare Interoperability Resources - XML format for exchanging healthcare information electronically."
  },
  {
    term: "BAPI",
    definition: "Business Application Programming Interface - SAP's standardized programming interface to access business processes."
  },
  {
    term: "XSLT",
    definition: "Extensible Stylesheet Language Transformations - a language for transforming XML documents."
  },
  {
    term: "Interoperability",
    definition: "The ability of different IT systems and software applications to communicate and exchange data accurately."
  }
];

const skills = [
  { skill: "SAP Clinical & ERP Integration", level: 95 },
  { skill: "HL7 CDA / FHIR XML Expertise", level: 90 },
  { skill: "XML Parsing & XSLT Transformations", level: 88 },
  { skill: "Secure Healthcare Data Workflows", level: 92 },
  { skill: "Automation with SAP APIs & BAPIs", level: 85 },
  { skill: "FHIR RESTful Services", level: 80 },
  { skill: "SAP HANA Data Modeling", level: 78 },
];

export default function SAPSection() {
  const [showXML, setShowXML] = useState(true);

  return (
    <section className="sap-section">
      <header className="sap-header">
        <h2 className="sap-title">SAP Integration & Healthcare XML Processing</h2>
        <p className="sap-subtitle">
          Designing advanced data pipelines connecting SAP Clinical modules and ERP systems with healthcare standards like HL7 CDA, FHIR XML, and CCD.
          Leveraging secure, scalable, and compliant technologies to empower clinical decision-making and patient outcomes.
        </p>
      </header>

      <article className="sap-main-content">
        <section className="sap-info-panel">
          <h3>Technical Overview</h3>
          <p>
            In modern healthcare IT, integrating Electronic Health Records (EHR) with ERP systems like SAP is critical.
            Standards such as <strong>HL7 CDA</strong> and <strong>FHIR XML</strong> provide structured formats for clinical data exchange.
            We use XML parsing, XSLT transformations, and SAP BAPIs to automate workflows, ensure data integrity, and enhance interoperability.
          </p>
          <p>
            Key considerations include HIPAA compliance, secure API authentication, data validation, and real-time event-driven data synchronization.
          </p>
          <button
            className="toggle-xml-btn"
            onClick={() => setShowXML(!showXML)}
            aria-expanded={showXML}
            aria-controls="xml-code-block"
          >
            {showXML ? "Hide" : "Show"} Sample XML Snippet
          </button>

          {showXML && (
            <pre id="xml-code-block" className="xml-code-block" tabIndex={0} aria-label="Sample HL7 CDA XML code snippet">
              <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(sampleXML) }} />
            </pre>
          )}
        </section>

        <section className="sap-skills-panel" aria-label="Key technical skills with proficiency">
          <h3>Key Skills & Technologies</h3>
          <div className="skills-list">
            {skills.map(({ skill, level }) => (
              <div key={skill} className="skill-item">
                <div className="skill-label">
                  {skill} <span className="skill-level">{level}%</span>
                </div>
                <div className="skill-bar-bg" role="progressbar" aria-valuenow={level} aria-valuemin="0" aria-valuemax="100">
                  <div className="skill-bar-fill" style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sap-glossary" aria-label="Glossary of terms">
          <h3>Glossary</h3>
          <dl>
            {glossary.map(({ term, definition }) => (
              <div key={term} className="glossary-item">
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </section>
  );
}
