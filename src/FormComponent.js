// File path: src/FormComponent.js

import React, { useState } from 'react';
import { Form, Tabs, Tab, Button, Row, Col, Container } from 'react-bootstrap';
import RadioToggleButtonGroup from './RadioToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormComponent.css';

export const initialFormData = {
  general: {
    reporterID: '',
    model: '',
    featureNumber: '',
    generalSummary: '',
    generalDescription: '',
    issuePriority: 'medium',
  },
  clincont: {
    clincontSummary: '',
    clincontDescription: '',
    clincontSolution: 'Clinical Content',
    clincontSolutionDetail: '',
    clincontJiraGroup: '',
    scIndicator: 'yes',
    clientViewableDescription: '',
    projectIdentifiers: '',
    clincontAssignee: '',
    clincontJiraLinkID: '',
    clientViewable: 'no',
  },
  clncont: {
    clncontSummary: '',
    clncontDescription: '',
    clncontSolution: '',
    clncontJiraGroup: '',
    clncontAssignee: '',
    clncontJiraLinkID: '',
    clncontSprint: 'CurSprint',
    clncontConceptCKI: 'no',
    clncontComponent1: 'MODELRETRIEVe',
    clncontComponent2: '',
    clncontComponent3: '',
    clncontContent: '',
    clncontRequiredTesting: 'full',
    clncontDesignerName: '',
    clncontComments: '',
  },
  jforms: {
    jformsSummary: '',
    jformsDescription: '',
    jformsSolution: 'Clinical Content',
    jformsSolutionDetail: '',
    jformsJiraGroup: '',
    jformsAssignee: '',
    jformsJiraLinkID: '',
    jformsProjectIdentifiers: '',
    diApprove: '',
    doApprove: '',
    addChanges: 'yes',
    includeHaz: 'yes',
    specifications: 'See feature for documentation',
    projTraceability: '',
    techDesignDoc: 'See feature for documentation',
    sourceCode: 'N/A',
  },
  ohaiuad: {
    ohaiuadSummary: '',
    ohaiuadDescription: '',
    ohaiuadSolution: '',
    ohaiuadSolutionDetail: '',
    ohaiuadJiraGroup: '',
    ohaiuadAssignee: '',
    ohaiuadJiraLinkID: '',
    ohaiuadComponent1: 'Reference Pages',
    ohaiuadComponent2: '',
    ohaiuadComponent3: '',
    ohaiuadDueDate: '',
    ohaiuadChangeNum: '',
    fileToAdd: '',
    fileToAdd2: '',
    ohaiuadIssueType: 'Documentation Enhancement',
  },
  package: {
    packageSummary: '',
    packageDescription: '',
    packageSolution: '',
    packageSolutionDetail: '',
    packageJiraGroup: '',
    packageAssignee: '',
    packageJiraLinkID: '',
    packageOldPack: '',
    packageIssueType: 'Content Package Request',
    packageName: '',
    packageOwner: '',
    packageOwnerID: '',
    packageDestination: '',
    packageReleaseMonth: '',
    packageReleaseDate: '',
    packageReviewDate: '',
    packageCR: '',
    packageFeature: '',
    packageStakeholders: '',
    packageNeedsChanges: 'no',
  },
};

const requiredFields = {
  general: ['model', 'generalSummary', 'generalDescription'],
  clincont: ['scIndicator', 'clincontSolutionDetail', 'clincontSolution', 'clincontJiraGroup', 'clincontSummary', 'clincontDescription'],
  clncont: ['clncontSprint', 'clncontComponent1', 'clncontDesignerName', 'clncontSummary', 'clncontDescription', 'clncontContent', 'clncontConceptCKI'],
  jforms: ['jformsSummary', 'jformsDescription', 'jformsSolution'],
  ohaiuad: ['ohaiuadIssueType', 'ohaiuadComponent1', 'ohaiuadDueDate', 'ohaiuadChangeNum', 'ohaiuadSummary', 'ohaiuadDescription'],
  package: ['packageSummary', 'packageName', 'packageOwner', 'packageOwnerID', 'packageSolution', 'packageDestination', 'packageReleaseMonth', 'packageReleaseDate', 'packageReviewDate', 'packageCR', 'packageFeature', 'packageNeedsChanges', 'packageDescription'],
};

const FormComponent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [tabStatus, setTabStatus] = useState({
    general: 'New',
    clincont: 'New',
    clncont: 'New',
    jforms: 'New',
    ohaiuad: 'New',
    package: 'New',
  });
  const [errors, setErrors] = useState({});
  const [isTabVisible, setIsTabVisible] = useState(false);

  const handleRadioChange = (value, type) => {
    setTabStatus({ ...tabStatus, [type]: value });
    if (value === 'N/A') {
      const newErrors = { ...errors };
      delete newErrors[type];
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e, type, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [type]: { ...formData[type], [field]: value } });
    if (type === 'general' && field === 'reporterID') {
      // Fill in other fields with reporterID
      setFormData(prevFormData => ({
        ...prevFormData,
        clncont: {
          ...prevFormData.clncont,
          clncontDesignerName: value,
          clncontAssignee: value,
        },
        clincont: {
          ...prevFormData.clincont,
          clincontAssignee: value,
        },
        jforms: {
          ...prevFormData.jforms,
          jformsAssignee: value,
          diApprove: `${value},`.trim(),
          doApprove: `${value},`.trim(),
        },
      }));
    }
    const newErrors = { ...errors };
    if (requiredFields[type]?.includes(field) && value.trim() === '') {
      if (!newErrors[type]) newErrors[type] = [];
      if (!newErrors[type].includes(field)) newErrors[type].push(field);
    } else {
      if (newErrors[type]) {
        newErrors[type] = newErrors[type].filter(errField => errField !== field);
        if (newErrors[type].length === 0) delete newErrors[type];
      }
    }
    setErrors(newErrors);
  };

  const handlePopulateModel = () => {
    if (formData.general.model === 'MODEL-555555' && formData.general.reporterID.trim() !== '') {
      alert("Filling the form model fields");
      setFormData({
        ...formData,
        general: {
          ...formData.general,
          generalSummary: "Test Text Summary",
          generalDescription: "Test Text Description",
          featureNumber: "123456"
        }
      });
      setIsTabVisible(true);
    } else {
      alert("Invalid model or missing reporter ID. Please enter 'MODEL-555555' and fill the Reporter ID");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(tabStatus).forEach(type => {
      if (tabStatus[type] === 'New') {
        requiredFields[type]?.forEach(field => {
          if (formData[type][field].trim() === '') {
            if (!newErrors[type]) newErrors[type] = [];
            newErrors[type].push(field);
          }
        });
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Add form submission logic here
      console.log('Form data submitted:', formData);
    }
  };

  const handleUseForAll = () => {
    const updatedFormData = { ...formData };
    const generalSummary = formData.general.generalSummary;
    const generalDescription = formData.general.generalDescription;

    Object.keys(updatedFormData).forEach(type => {
      if (type !== 'general' && updatedFormData[type].hasOwnProperty(`${type}Summary`) && updatedFormData[type].hasOwnProperty(`${type}Description`)) {
        updatedFormData[type][`${type}Summary`] = generalSummary;
        updatedFormData[type][`${type}Description`] = generalDescription;
      }
    });

    setFormData(updatedFormData);
  };

  const renderInputField = (type, field, label, required = false, extraContent = null) => (
    <Form.Group as={Row} controlId={`${type}_${field}`} className="form-group mb-3">
      <Form.Label column sm="3">{label} {required && '*'}</Form.Label>
      <Col sm="7">
        <Form.Control
          type="text"
          name={field}
          value={formData[type][field]}
          onChange={(e) => handleInputChange(e, type, field)}
          className={`form-control ${errors[type]?.includes(field) ? 'is-invalid' : ''}`}
        />
        {errors[type]?.includes(field) && <div className="invalid-feedback">This field is required</div>}
      </Col>
      {extraContent && (
        <Col sm="2">
          {extraContent}
        </Col>
      )}
    </Form.Group>
  );

  const renderTextareaField = (type, field, label, required = false) => (
    <Form.Group as={Row} controlId={`${type}_${field}`} className="form-group mb-3">
      <Form.Label column sm="3">{label} {required && '*'}</Form.Label>
      <Col sm="9">
        <Form.Control
          as="textarea"
          rows={3}
          name={field}
          value={formData[type][field]}
          onChange={(e) => handleInputChange(e, type, field)}
          className={`form-control ${errors[type]?.includes(field) ? 'is-invalid' : ''}`}
        />
        {errors[type]?.includes(field) && <div className="invalid-feedback">This field is required</div>}
      </Col>
    </Form.Group>
  );

  const renderSelectField = (type, field, label, options, required = false) => (
    <Form.Group as={Row} controlId={`${type}_${field}`} className="form-group mb-3">
      <Form.Label column sm="3">{label} {required && '*'}</Form.Label>
      <Col sm="9">
        <Form.Select
          name={field}
          value={formData[type][field]}
          onChange={(e) => handleInputChange(e, type, field)}
          className={`form-control ${errors[type]?.includes(field) ? 'is-invalid' : ''}`}
        >
          <option value="" disabled>{label}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </Form.Select>
        {errors[type]?.includes(field) && <div className="invalid-feedback">This field is required</div>}
      </Col>
    </Form.Group>
  );

  const renderRadioButtonGroup = (type, field, label) => (
    <Form.Group as={Row} controlId={`${type}_${field}`} className="form-group mb-3">
      <Form.Label column sm="3">{label}</Form.Label>
      <Col sm="9">
        <Form.Check
          inline
          type="radio"
          name={field}
          label="Yes"
          value="yes"
          checked={formData[type][field] === 'yes'}
          onChange={(e) => handleInputChange(e, type, field)}
        />
        <Form.Check
          inline
          type="radio"
          name={field}
          label="No"
          value="no"
          checked={formData[type][field] === 'no'}
          onChange={(e) => handleInputChange(e, type, field)}
        />
      </Col>
    </Form.Group>
  );

  const renderTabContent = (type) => {
    if (tabStatus[type] === 'N/A') return null;

    if (tabStatus[type] === 'Link') {
      return renderInputField(type, `${type}JiraLinkID`, 'Jira Link ID', true);
    }

    switch (type) {
      case 'general':
        return (
          <>
            {renderInputField('general', 'featureNumber', 'Feature Number')}
            {renderInputField('general', 'generalSummary', 'General Summary', true, <Button variant="secondary" onClick={handleUseForAll}>Use for All</Button>)}
            {renderInputField('general', 'generalDescription', 'General Description', true, <Button variant="secondary" onClick={handleUseForAll}>Use for All</Button>)}
            {renderSelectField('general', 'issuePriority', 'Issue Priority', ['low', 'medium', 'high'])}
          </>
        );
      case 'clincont':
        return (
          <>
            {renderInputField('clincont', 'clincontSummary', 'Summary', true)}
            {renderTextareaField('clincont', 'clincontDescription', 'Description', true)}
            {renderSelectField('clincont', 'clincontSolution', 'Solution', ['Clinical Content', 'OtherSolution'], true)}
            {renderSelectField('clincont', 'clincontSolutionDetail', 'Solution Detail', ['Detail 1', 'Detail 2'], true)}
            {renderSelectField('clincont', 'clincontJiraGroup', 'Jira Group', ['Group 1', 'Group 2'], true)}
            {renderRadioButtonGroup('clincont', 'scIndicator', 'SC Indicator')}
            {renderTextareaField('clincont', 'clientViewableDescription', 'Client Viewable Description')}
            {renderTextareaField('clincont', 'projectIdentifiers', 'Project Identifiers')}
            {renderInputField('clincont', 'clincontAssignee', 'Assignee')}
            {renderInputField('clincont', 'clincontJiraLinkID', 'Jira Link ID')}
            {renderRadioButtonGroup('clincont', 'clientViewable', 'Client Viewable')}
          </>
        );
      case 'clncont':
        return (
          <>
            {renderInputField('clncont', 'clncontSummary', 'Summary', true)}
            {renderTextareaField('clncont', 'clncontDescription', 'Description', true)}
            {renderInputField('clncont', 'clncontSolution', 'Solution')}
            {renderInputField('clncont', 'clncontAssignee', 'Assignee')}
            {renderInputField('clncont', 'clncontJiraLinkID', 'Jira Link ID')}
            {renderSelectField('clncont', 'clncontSprint', 'Sprint', ['CurSprint', 'NextSprint'], true)}
            {renderSelectField('clncont', 'clncontComponent1', 'Component 1', ['MODELRETRIEVe', 'OtherComponent1'], true)}
            {renderInputField('clncont', 'clncontComponent2', 'Component 2')}
            {renderInputField('clncont', 'clncontComponent3', 'Component 3')}
            {renderSelectField('clncont', 'clncontContent', 'Content', ['Content 1', 'Content 2'])}
            {renderSelectField('clncont', 'clncontRequiredTesting', 'Required Testing', ['full', 'partial'])}
            {renderInputField('clncont', 'clncontDesignerName', 'Designer Name', true)}
            {renderRadioButtonGroup('clncont', 'clncontConceptCKI', 'Concept CKI')}
            {renderTextareaField('clncont', 'clncontComments', 'Comments')}
          </>
        );
      case 'jforms':
        return (
          <>
            {renderInputField('jforms', 'jformsSummary', 'Summary', true)}
            {renderTextareaField('jforms', 'jformsDescription', 'Description', true)}
            {renderSelectField('jforms', 'jformsSolution', 'Solution', ['Clinical Content', 'OtherSolution'], true)}
            {renderSelectField('jforms', 'jformsSolutionDetail', 'Solution Detail', ['Detail 1', 'Detail 2'], true)}
            {renderSelectField('jforms', 'jformsJiraGroup', 'Jira Group', ['Group 1', 'Group 2'], true)}
            {renderInputField('jforms', 'jformsAssignee', 'Assignee')}
            {renderInputField('jforms', 'jformsJiraLinkID', 'Jira Link ID')}
            {renderInputField('jforms', 'jformsProjectIdentifiers', 'Project Identifiers')}
            {renderTextareaField('jforms', 'diApprove', 'DI Approve')}
            {renderTextareaField('jforms', 'doApprove', 'DO Approve')}
            {renderRadioButtonGroup('jforms', 'addChanges', 'Add Changes')}
            {renderRadioButtonGroup('jforms', 'includeHaz', 'Include Haz')}
            {renderTextareaField('jforms', 'specifications', 'Specifications')}
            {renderTextareaField('jforms', 'projTraceability', 'Project Traceability')}
            {renderTextareaField('jforms', 'techDesignDoc', 'Technical Design Doc')}
            {renderTextareaField('jforms', 'sourceCode', 'Source Code')}
          </>
        );
      case 'ohaiuad':
        return (
          <>
            {renderInputField('ohaiuad', 'ohaiuadSummary', 'Summary', true)}
            {renderTextareaField('ohaiuad', 'ohaiuadDescription', 'Description', true)}
            {renderInputField('ohaiuad', 'ohaiuadSolution', 'Solution')}
            {renderInputField('ohaiuad', 'ohaiuadSolutionDetail', 'Solution Detail')}
            {renderInputField('ohaiuad', 'ohaiuadJiraGroup', 'Jira Group')}
            {renderInputField('ohaiuad', 'ohaiuadAssignee', 'Assignee')}
            {renderInputField('ohaiuad', 'ohaiuadJiraLinkID', 'Jira Link ID')}
            {renderSelectField('ohaiuad', 'ohaiuadComponent1', 'Component 1', ['Reference Pages', 'OtherComponent1'], true)}
            {renderInputField('ohaiuad', 'ohaiuadComponent2', 'Component 2')}
            {renderInputField('ohaiuad', 'ohaiuadComponent3', 'Component 3')}
            {renderInputField('ohaiuad', 'ohaiuadDueDate', 'Due Date', true)}
            {renderInputField('ohaiuad', 'ohaiuadChangeNum', 'Change Number', true)}
            {renderInputField('ohaiuad', 'fileToAdd', 'File to Add')}
            {renderInputField('ohaiuad', 'fileToAdd2', 'File to Add 2')}
            {renderSelectField('ohaiuad', 'ohaiuadIssueType', 'Issue Type', ['Documentation Enhancement', 'OtherIssueType'], true)}
          </>
        );
      case 'package':
        return (
          <>
            {renderInputField('package', 'packageSummary', 'Summary', true)}
            {renderTextareaField('package', 'packageDescription', 'Description', true)}
            {renderInputField('package', 'packageSolution', 'Solution', true)}
            {renderInputField('package', 'packageSolutionDetail', 'Solution Detail')}
            {renderInputField('package', 'packageJiraGroup', 'Jira Group')}
            {renderInputField('package', 'packageAssignee', 'Assignee')}
            {renderInputField('package', 'packageJiraLinkID', 'Jira Link ID')}
            {renderInputField('package', 'packageOldPack', 'Old Pack')}
            {renderSelectField('package', 'packageIssueType', 'Issue Type', ['Content Package Request', 'OtherIssueType'])}
            {renderInputField('package', 'packageName', 'Package Name', true)}
            {renderInputField('package', 'packageOwner', 'Package Owner', true)}
            {renderInputField('package', 'packageOwnerID', 'Package Owner ID', true)}
            {renderInputField('package', 'packageDestination', 'Destination', true)}
            {renderSelectField('package', 'packageReleaseMonth', 'Release Month', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], true)}
            {renderInputField('package', 'packageReleaseDate', 'Release Date', true, <Form.Control type="date" />)}
            {renderInputField('package', 'packageReviewDate', 'Review Date', true, <Form.Control type="date" />)}
            {renderInputField('package', 'packageCR', 'CR', true)}
            {renderInputField('package', 'packageFeature', 'Feature', true)}
            {renderTextareaField('package', 'packageStakeholders', 'Stakeholders')}
            {renderRadioButtonGroup('package', 'packageNeedsChanges', 'Needs Changes')}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-container">
      <h1>Form</h1>
      <Container>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            {renderInputField('general', 'reporterID', 'Reporter ID', true)}
          </Col>
          <Col xs={12} md={6}>
            {renderInputField('general', 'model', 'Model', true, <Button variant="secondary" onClick={handlePopulateModel} disabled={!formData.general.reporterID.trim()}>Populate</Button>)}
          </Col>
        </Row>
        {isTabVisible && (
          <>
            <Row className="mb-3">
              {Object.keys(initialFormData).filter(type => type !== 'general').map((type) => (
                <Col key={type} xs={12} md={6} lg={4} className="mb-3">
                  <Row>
                    <Col xs={4} className="d-flex align-items-center">
                      <Form.Label>{type.toUpperCase()}</Form.Label>
                    </Col>
                    <Col xs={8}>
                      <RadioToggleButtonGroup
                        type={type}
                        currentValue={tabStatus[type]}
                        onChange={handleRadioChange}
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>

            <Tabs defaultActiveKey="general" id="form-tabs" className="mb-3">
              {Object.keys(initialFormData).map((type) => (
                <Tab
                  key={type}
                  eventKey={type}
                  title={
                    <>
                      {tabStatus[type] === 'N/A' ? (
                        <span className="na-tab">{type.toUpperCase()}</span>
                      ) : (
                        type.toUpperCase()
                      )}
                      {errors[type] && errors[type].length > 0 && <span className="error-indicator"> *</span>}
                    </>
                  }
                  disabled={tabStatus[type] === 'N/A'}
                >
                  {renderTabContent(type)}
                </Tab>
              ))}
            </Tabs>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </>
        )}
      </Container>
    </Form>
  );
};

export default FormComponent;
