"use client"

import React from 'react';
import "./styles.css";
import { Editor } from './text-editor'

export default function TextEditor() {

  return (
    <div className="border">
      <Editor />
    </div>
  )
}
