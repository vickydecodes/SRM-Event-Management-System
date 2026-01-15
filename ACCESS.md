# Access Control Design  
**In-College Event Management System**

Version: 1.0  
Date: January 2025  
Status: Design Specification

## 1. Core Design Principle

> **No default access is granted to anyone.**  
> Access is permitted **only after successful academic verification**.

This foundational rule achieves the following objectives:

- Prevents creation of fake or external accounts  
- Guarantees only legitimate students, faculty, and staff can participate  
- Mirrors actual institutional approval workflows  
- Establishes trust in event participation data and attendee lists  
- Enables enforceable, auditable business rules

## 2. Actor Overview

| Actor              | Description                                          | Primary Purpose                        | Can Log In? | Can Register for Events? |
|--------------------|------------------------------------------------------|----------------------------------------|-------------|---------------------------|
| Student Applicant  | Student who submitted access request (not yet verified) | Onboarding & academic verification     | No          | No                        |
| Student            | Fully verified student with approved academic profile | Event discovery & participation        | Yes         | Yes                       |
| Staff              | Faculty or non-administrative staff                  | Event creation & coordination          | Yes         | No                        |
| HOD / Admin        | Department Heads or System Administrators            | Final approval, oversight & enforcement | Yes         | No                        |

## 3. Student Application Stage (Pre-Authentication)

**Purpose**  
Verify institutional affiliation **before** creating any login credentials.

**Allowed Actions**
- Submit new student access application
- Provide required academic credentials
- View current application status

**Prohibited Actions**
- Login / authentication
- Access any protected routes
- View events
- Register for events
- Interact with any system functionality

**Stored Application Data (minimal set)**
- Full name
- University register / roll number
- Department
- Course / program
- Year of study
- Institutional email address
- Application status (`PENDING` / `APPROVED` / `REJECTED`)
- Timestamp of submission
- Timestamp & remarks of last review (if reviewed)

## 4. User (Authentication Entity)

**Purpose**  
Pure login identity – **completely decoupled** from academic information.

**Creation Rule**  
A `User` record is **only created after HOD/Admin approval** of the student application.

**Fields**
- Email (unique)
- Password hash
- Role (`STUDENT` / `STAFF` / `ADMIN`)
- Is active (boolean)
- Last login timestamp
- Created / approved timestamp

**Important invariant**  
→ No `User` exists for a student until their application is **explicitly approved**.

## 5. Student (Verified Academic Profile)

**Purpose**  
Represents a verified academic identity linked 1:1 to a `User`.

**Created**  
Automatically upon application approval.

**Capabilities**
- Log in
- View list of upcoming / ongoing events
- View event details
- Register for eligible events
- View own registration status & history
- Contact event organizers (limited channels)

**Registration Eligibility Rules (all must be true)**
1. Event is currently open for registration
2. Registration is within allowed time window
3. Student’s department is allowed (or event is open to all)
4. Slots / seats are still available
5. Student has not already registered for this event
6. No conflicting registration (if enforced by policy)

## 6. Staff Capabilities & Boundaries

**Allowed Actions**
- Create new event drafts
- Edit event content (title, description, poster, rules)
- Define registration parameters (dates, capacity, eligibility)
- Submit event for HOD/Admin approval
- Edit drafts or rejected events
- View participant list for **approved & published** events they created

**Prohibited Actions**
- Approve their own events
- Modify registration parameters of already approved events
- Bypass approval workflow
- Directly change event status to published

## 7. HOD / Admin Capabilities & Boundaries

**Allowed Actions**
- Review & decide on student applications  
  → Approve → creates User + Student profile  
  → Reject → final, with optional reason
- Review & decide on event submissions  
  → Approve → event becomes visible & open for registration  
  → Reject → returns to staff with remarks
- Cancel / suspend already approved events (with justification)
- View system-wide reports (applications, events, registrations)
- Enforce institutional rules & resolve conflicts

**Authority Rules**
- Approval / rejection decisions are **final**
- Any post-approval change to critical event fields requires **re-approval**
- Can override capacity / eligibility in exceptional cases (logged)

## 8. Login & Access Summary Table

| Stage / Role       | Can Log In? | Can View Events? | Can Register? | Can Create Events? | Can Approve? |
|--------------------|-------------|------------------|---------------|--------------------|--------------|
| Student Applicant  | No          | No               | No            | No                 | No           |
| Approved Student   | Yes         | Yes              | Yes           | No                 | No           |
| Staff              | Yes         | Yes              | No            | Yes (drafts)       | No           |
| HOD / Admin        | Yes         | Yes              | No            | Yes (if also staff)| Yes          |

## 9. Long-term Advantages of This Design

- Strong prevention of unauthorized / fake accounts
- Clean separation of authentication vs. academic domain
- Enforceable, auditable approval workflows
- Clear responsibility boundaries → easier debugging & maintenance
- Natural alignment with real-world college hierarchies
- Scalable to add new roles or stricter rules later
- Minimal user table (only verified people exist as Users)

## 10. Final Design Philosophy

This access control model deliberately chooses:

**Correctness over convenience**  
**Verification over open access**  
**Clear boundaries over flexibility**

The result is a system that remains trustworthy, explainable, maintainable, and aligned with institutional values over many years.

---
**End of Document**