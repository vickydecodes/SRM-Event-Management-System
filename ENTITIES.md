# ENTITIES.md — Entity Responsibilities & Lifecycle Rules

This document defines all **core entities**, their **purpose**, **who can modify them**,  
and **until when modifications are allowed**.

The goal is to avoid ambiguity, prevent accidental data corruption, and ensure
long-term maintainability.

---

## 1. Core Design Rule

> **Every entity has a point after which it becomes confirmed and immutable.**

- Presentation entities remain flexible longer
- Business-rule entities lock early
- Approval is the main boundary that freezes data

---

## 2. Entity Summary

| Entity | Role |
|------|-----|
| StudentApplication | Pre-login verification |
| User | Authentication identity |
| Student | Verified academic profile |
| Event | Event presentation & identity |
| EventRegistration | Event execution & lifecycle |

---

## 3. StudentApplication

### Purpose
Collects student details **before** system access is granted.

### Modifiable By
- Student (before submission)
- Admin / HOD (status & remarks)

### Lifecycle & Mutability

| Status | Can Modify? | Who |
|-----|-----------|----|
| PENDING | ✅ Yes | Admin / HOD |
| APPROVED | ❌ No | — |
| REJECTED | ❌ No | — |

### Confirmation Rule
> Once **APPROVED**, this entity is considered **final**  
and is used to create `User` and `Student`.

---

## 4. User

### Purpose
Represents **login credentials and role**, nothing else.

### Modifiable By
- System (on creation)
- Admin (status only)

### Modifiable Fields
- `isActive`

### Immutable Fields
- Email
- Role

### Confirmation Rule
> Users are created **only after approval**  
and never store academic or event-related data.

---

## 5. Student

### Purpose
Represents a **verified academic identity**.

### Modifiable By
- Admin / HOD

### Modifiable Fields
- Year (promotion)
- Status (active/inactive)

### Immutable Fields
- Register number
- Department
- Course

### Confirmation Rule
> Once created, a Student is considered **trusted**  
and eligible for event participation.

---

## 6. Event

### Purpose
Defines **what the event is** — content, visibility, and communication.

### Modifiable By
- Staff (creator)
- Admin (if required)

### Modifiable Fields
- Title
- Description (Markdown)
- Images
- Event handler name & contact
- CTA (presentation hint)

### Lifecycle & Mutability

| Event Status | Can Modify Content? |
|------------|-------------------|
| UPCOMING | ✅ Yes |
| ONGOING | ⚠️ Limited (no major edits) |
| ENDED | ❌ No |

### Confirmation Rule
> Event content remains editable **until the event starts**.  
After start time, the event is considered **historical**.

---

## 7. EventRegistration

### Purpose
Defines **how the event runs** — schedule, hall, rules, approval, and participants.

This is the **source of truth for all business logic**.

### Modifiable By
- Staff (before approval)
- Admin (during review)

### Key Fields
- Event date & time
- Registration window
- Hall
- Allowed departments
- Max participants
- Participants list
- Approval status

---

### Lifecycle & Mutability

| Status | Can Modify? | Notes |
|-----|-----------|------|
| DRAFT | ✅ Yes | Staff editing |
| PENDING | ⚠️ Limited | Staff (before admin action) |
| APPROVED | ❌ No | Locked |
| REJECTED | ❌ No | New draft required |
| COMPLETED | ❌ No | Historical |

---

### Confirmation Rule (Very Important)

> Once an EventRegistration is **APPROVED**:
- Event date **cannot change**
- Hall **cannot change**
- Registration window **cannot change**
- Participant rules **cannot change**

Any change after approval requires:
- Cancelling the registration
- Creating a **new EventRegistration**
- Re-approval

---

## 8. Time-Based Confirmation Rules

| Condition | Meaning |
|--------|--------|
| Before approval | Data is tentative |
| After approval | Data is confirmed |
| After event start | Data is historical |
| After event end | Data is immutable |

---

## 9. Why These Rules Exist

- Prevents silent data corruption
- Preserves auditability
- Avoids confusing UI behavior
- Keeps approval meaningful
- Supports long-term system growth

---

## 10. Final Note

This system intentionally separates:
- **Identity vs Execution**
- **Presentation vs Rules**
- **Draft vs Confirmed Data**

Any future feature must respect these boundaries.
