# File Upload Validator Skill

**Purpose:** Ensures all file upload workflows work correctly with proper progress indication, validation, permissions, cost optimization, and seamless UI integration.

## What This Skill Does

This skill performs comprehensive audits on all file upload workflows by:

1. **Discovering all upload endpoints** in the system
2. **Validating upload endpoint security** (authentication, authorization)
3. **Checking file validation** (size, type, format)
4. **Verifying storage integration** (BunnyCDN, S3, local)
5. **Testing database storage** (URLs, metadata, arrays)
6. **Validating file display** in all viewers (admin, professor, student, company)
7. **Checking UI progress** indicators during upload
8. **Validating preview display** after upload
9. **Checking form integration** (can't submit until files ready)
10. **Analyzing performance & costs** (compression, caching, CDN)
11. **Checking permissions** (who can upload what, role-based limits)

## When to Use

Invoke this skill when:
- File uploads fail silently
- Images/videos don't display
- Upload progress not shown
- Forms submit without complete files
- CDN costs are too high
- Unauthorized users uploading files
- Files not accessible after upload
- After adding new upload workflow
- Before major releases

## What It Checks

### 1. Upload Endpoint
- ✅ Endpoint exists and is accessible
- ✅ Authentication required
- ✅ Authorization checks (user owns resource)
- ✅ Request validation (CSRF, rate limit)
- ✅ File present in request
- ✅ Error handling for missing files

### 2. File Validation
- ✅ File size limits enforced
- ✅ File type validation (MIME type check)
- ✅ File extension validation
- ✅ Malicious file detection (polyglots, executables)
- ✅ Virus scanning (if configured)
- ✅ Content-type header validation

### 3. Storage Integration
- ✅ BunnyCDN credentials configured
- ✅ Storage zone/path exists
- ✅ File uploaded successfully
- ✅ URL returned is accessible
- ✅ File permissions correct
- ✅ Replication enabled (if needed)

### 4. Video Encoding (Bunny Stream)
- ✅ Video uploaded to Bunny Stream
- ✅ Encoding initiated automatically
- ✅ Webhook handling works
- ✅ Encoding status tracked
- ✅ Failed encoding handled
- ✅ Multiple bitrates generated

### 5. Database Storage
- ✅ File URL stored in correct field
- ✅ JSON arrays handled properly
- ✅ Metadata stored (size, type, encoding)
- ✅ Relations maintained
- ✅ Transaction safety

### 6. Display in Viewers
- ✅ Images display with <img> tags
- ✅ Videos play with video players
- ✅ PDFs accessible via iframe/download
- ✅ Alt text provided for accessibility
- ✅ Responsive images (srcset)
- ✅ Lazy loading implemented

### 7. UI Progress Indicators
- ✅ Progress bar shown during upload
- ✅ Percentage displayed
- ✅ Upload cancellation supported
- ✅ Success/error feedback clear
- ✅ Multiple file upload progress clear

### 8. Preview Display
- ✅ Image thumbnail shown after upload
- ✅ Video thumbnail after encoding
- ✅ File name/size displayed
- ✅ Delete/remove button provided
- ✅ Replace option available

### 9. Form Integration
- ✅ Form disabled during upload
- ✅ Submit button disabled until upload complete
- ✅ File URL validated before form submission
- ✅ Failed uploads block form submission
- ✅ Upload errors shown clearly
- ✅ Can retry failed uploads

### 10. Permissions & Security
- ✅ Only authenticated users can upload
- ✅ Role-based file size limits
- ✅ File ownership validation
- ✅ Access control on file URLs
- ✅ Temporary URLs expire correctly

### 11. Performance & Cost
- ✅ Images optimized/compressed
- ✅ Videos use adaptive bitrate
- ✅ CDN caching headers set
- ✅ BunnyCDN pull zones configured
- ✅ Bandwidth-efficient delivery
- ✅ Cost-effective storage choices
- ✅ Old files cleaned up

## File Upload Workflow Tracing

For each upload workflow, this skill traces:

```
┌─────────────────────────────────────────────────────────────────┐
│                   FILE UPLOAD WORKFLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                              │
│  1. USER SELECTS FILE                                         │
│     [File Input Component]                                    │
│          │                                                     │
│          ↓ user selects file                                 │
│     [onChange Handler]                                        │
│          │                                                     │
│          ↓                                                     │
│     [Validate File] → size, type, dimensions                 │
│          │                                                     │
│          ↓ valid?                                             │
│     [Upload Started] → show progress                          │
│                                                              │
│  2. FILE UPLOADING                                           │
│     [Progress Bar] → 0% → 100%                               │
│          │                                                     │
│          ↓ uploading...                                       │
│     [POST /api/upload] → FormData                           │
│          │                                                     │
│          ↓                                                     │
│     [Server Validation] → re-check                             │
│          │                                                     │
│          ↓                                                     │
│     [BunnyCDN API] → PUT file                                │
│          │                                                     │
│          ↓                                                     │
│     [Video Encoding] → if video (async)                       │
│          │                                                     │
│          ↓                                                     │
│     [URL Generated] → https://...                              │
│          │                                                     │
│          ↓                                                     │
│     [Update Progress] → 100%                                  │
│                                                              │
│  3. POST-UPLOAD                                               │
│     [Preview Display] → show thumbnail                        │
│          │                                                     │
│          ↓                                                     │
│     [Update Form State] → fileUrl set                          │
│          │                                                     │
│          ↓                                                     │
│     [Enable Submit] → unlock form submit                      │
│                                                              │
│  4. DISPLAY                                                   │
│     [Viewer Component]                                      │
│          │                                                     │
│          ↓                                                     │
│     [Fetch File] → from BunnyCDN                              │
│          │                                                     │
│          ↓                                                     │
│     [Display/Play] → <img>, <video>, or download              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Output Format

```markdown
╔════════════════════════════════════════════════════════════════╗
║              FILE UPLOAD AUDIT REPORT                           ║
╠════════════════════════════════════════════════════════════════╣
║ 📊 EXECUTION SUMMARY                                          ║
║   Workflows Audited: 7                                        ║
║   Issues Found: 5                                            ║
║   Critical: 1  🔴  High: 2  🟠  Medium: 1  🟡  Low: 1       ║
║                                                              ║
║ 🔴 CRITICAL ISSUES (Fix Immediately)                          ║
║   [ ] Form submits with incomplete files - CareerForm          ║
║       File: src/components/careers/form.tsx:234               ║
║       Impact: Database stores empty URLs                         ║
║       Fix: Add fileReady check before submit                   ║
║                                                              ║
║ 🟠 HIGH PRIORITY                                             ║
║   [ ] No upload progress indicator - TrainingForm         ║
║       File: src/components/training/subscription-form.tsx:526 ║
║       Impact: Users don't know upload status                    ║
║       Fix: Add progress bar during upload                      ║
║                                                              ║
╚════════════════════════════════════════════════════════════════╝

## DETAILED FINDINGS

### Workflow: Service Application Photos
**Files:**
- Upload: src/components/forms/GenericForm.tsx:527
- Endpoint: /api/upload
- Storage: BunnyCDN courseszone

| Layer | Check | Status | Details |
|-------|-------|--------|---------|
| **Endpoint** | Authentication | ✅ | Protected mutation |
| **Endpoint** | Validation | ✅ | Checks size, type |
| **Storage** | BunnyCDN | ✅ | courseszone configured |
| **Storage** | Path Pattern | ✅ | services/{type}/{userId}/ |
| **Database** | URL Storage | ✅ | TrainingApplication.photoUrls |
| **Database** | Array Handling | ✅ | JSON array stores all URLs |
| **Display** | Professor View | ✅ | Images shown correctly |
| **UI** | Progress Indicator | ❌ | No progress bar shown |
| **UI** | Preview | ✅ | Thumbnail displayed |
| **Form** | Submit Blocking | ✅ | Can't submit incomplete |

**Issue Found:**
```typescript
// GenericForm.tsx line 526-562 - File input component
// Missing: Progress indicator during upload
// Current: Shows "Uploading..." text
// Should: Show actual progress bar
```

**Fix:** Add progress bar component during upload.

### Workflow: Course Lesson Videos
**Files:**
- Upload: /api/upload-with-encoding
- Storage: Bunny Stream
- Tracking: Attachment model

| Layer | Check | Status | Details |
|-------|-------|--------|---------|
| **Endpoint** | Video Handling | ✅ | Supports video upload |
| **Encoding** | Bunny Stream | ✅ | Automatic encoding |
| **Encoding** | Status Tracking | ✅ | Attachment.isReady field |
| **Encoding** | Webhook | ⚠️ | Check webhook failure handling |
| **Database** | URL Storage | ✅ | Attachment.bunnyCdnUrl |
| **Display** | Video Player | ✅ | Uses BunnyCDN player |
| **Performance** | Bitrate Ladder | ✅ | Multiple qualities generated |
| **Cost** | Bandwidth | ✅ | Adaptive streaming saves costs |

**Optimization Opportunity:**
- Consider adding bandwidth detection
- Implement quality selection based on network

### Workflow: Career Documents (CV, Certificates)
**Files:**
- Upload: /api/upload/careers
- Storage: BunnyCDN courseszone
- Tracking: CareersProfile model

| Layer | Check | Status | Details |
|-------|-------|--------|---------|
| **Endpoint** | Role Check | ✅ | Only careers users |
| **Validation** | File Size | ✅ | 5MB limit |
| **Validation** | File Type | ✅ | PDF, DOCX, images |
| **Storage** | Path | ✅ | careers/{documents}/{userId}/ |
| **Database** | URL Storage | ✅ | CareersProfile.cvUrl, certificates array |
| **Display** | Student View | ✅ | Download links shown |
| **Display** | Company View | ⚠️ | Companies can't see CVs yet |

## PERMISSIONS AUDIT

| Upload Type | Authentication | Role | Size Limit | Notes |
|-------------|----------------|------|------------|-------|
| Course Lessons | Required | ADMIN/PROFESSOR | Unlimited | Admin unlimited |
| Blog Covers | Required | ADMIN | 5MB | Professor 2MB |
| Professor Avatar | Required | PROFESSOR | 2MB | Square image |
| Service Photos | Required | STUDENT | 5MB | With payment |
| Career Docs | Required | STUDENT/ALUMNI | 5MB | CV + certificates |
| General | Required | AUTHENTICATED | 5MB | Role-based |

## COST ANALYSIS

### Current Month Usage

| Service | Storage | Bandwidth | Encoding | Total |
|---------|---------|----------|----------|-------|
| BunnyCDN | $0.01/GB | $0.01/GB | - | $0.02/GB |
| Bunny Stream | $0.005/GB | $0.01/GB | $0.003/GB | $0.018/GB |
| Total | - | - | - | **Est: $50-200/mo** |

### Optimization Opportunities

1. **Image Compression:**
   - Current: Uncompressed uploads
   - Suggestion: Add sharp/imagick on upload
   - Savings: 30-50% bandwidth

2. **Video Bitrate Ladder:**
   - Current: Fixed qualities
   - Suggestion: Adaptive based on bandwidth
   - Savings: 20-40% bandwidth

3. **CDN Caching:**
   - Current: Default (1 hour)
   - Suggestion: Set 30 days for static assets
   - Savings: 95% cache hit rate

4. **Lazy Loading:**
   - Current: Load all images immediately
   - Suggestion: Intersection Observer
   - Savings: 40-60% bandwidth

## PERFORMANCE METRICS

| Workflow | Avg Upload Time | Encoding Time | Total Time | Target |
|----------|----------------|---------------|------------|--------|
| Photo (<5MB) | 2s | - | 2s | <5s ✅ |
| Video (<50MB) | 15s | 30-60s | 45-75s | <120s ✅ |
| PDF (<5MB) | 3s | - | 3s | <10s ✅ |

## FORM INTEGRATION CHECKLIST

For each form with file uploads:

- [ ] Form disabled during upload
- [ ] Submit button disabled during upload
- [ ] File URL validated before enabling submit
- [ ] Failed upload shows error message
- [ ] Can retry failed upload
- [ ] Can remove/replaced uploaded file
- [ ] File preview shown after upload
- [ ] File name/size displayed
- [ ] Upload cancellation supported
- [ ] Multiple files handled correctly
- [ ] Form submission waits for all uploads
- [ ] File URLs stored correctly in database

## PATTERNS LEARNED

### Pattern 1: Upload Progress Not Shown
🔍 **First Found:** 2025-01-08
🎯 **Issue:** Users don't know upload status during large files
✅ **Solution:** Add progress bar component with percentage
📚 **Learning:** Always show progress for uploads >1MB

### Pattern 2: Form Submits with Incomplete Files
🔍 **First Found:** 2025-01-08
🎯 **Issue:** Form submit before upload completes
✅ **Solution:** Track upload completion in state, disable submit
📚 **Learning:** Use `uploading` state and block submission

### Pattern 3: Video Encoding Failure Not Handled
🔍 **First Found:** 2025-01-08
🎯 **Issue:** Videos fail silently if webhook drops
✅ **Solution:** Poll encoding status, implement retry logic
📚 **Learning:** Async processes need robust fallback

## DEVICE-SPECIFIC CHECKS

### Mobile Upload Considerations

- [ ] Touch targets large enough (44px+)
- [ ] File picker works on iOS/Android
- [ ] Camera integration works
- [ ] Upload continues in background
- [ ] Progress visible on small screens

### Desktop Upload Considerations

- [ ] Drag-and-drop supported
- [ ] Multiple file selection works
- [ ] Large file handling (>100MB)
- [ ] Upload cancellation works
- [ ] Background upload indicator

## KNOWN ISSUES & WORKAROUNDS

### BunnyCDN Webhook Reliability
**Issue:** Webhook for video encoding may fail
**Workaround:** Poll `Attachment.isReady` status
**Long-term:** Implement robust webhook retry

### Large File Uploads
**Issue:** Browser timeout on files >100MB
**Workaround:** Chunked upload (not yet implemented)
**Long-term:** Implement resumable upload

### File Type Validation
**Issue:** MIME type spoofing possible
**Workaround:** Validate file magic bytes
**Long-term:** Server-side deep inspection

## Usage

```bash
# Audit all upload workflows
/claude "Run file upload audit on all workflows"

# Audit specific workflow
/claude "Check service application photo uploads"

# Check permissions
/claude "Validate file upload permissions across all endpoints"

# Cost analysis
/claude "Analyze CDN storage and bandwidth costs"

# Check form integration
/claude "Verify form integration with file uploads for CareerForm"
```

## Notes

- Always test file uploads with different sizes (1KB, 1MB, 10MB, 100MB)
- Test upload cancellation and retry flows
- Verify file access across all viewer roles
- Check BunnyCDN API rate limits (1 req/sec)
- Monitor CDN costs monthly
- Test on slow connections (3G throttling)
- Verify video encoding completion
- Check for duplicate file prevention
