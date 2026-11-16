export default function SignupForm() {
  function handleSubmit(event) {
    event.preventDefault();

    // Connect this to FastAPI later.
  }

  return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-4 rounded-2xl p-6 font-poppins bg-white shadow-md mx-auto "
      >
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            Welcome to{" "}
            <span className="font-lavishly text-4xl">Le Crochet</span>
          </h1>
          <p className="mt-2 text-sm text-stone-500">Create your account.</p>
        </div>

        <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4">
            <FormField id="firstname" label="First Name" placeholder="Ex. Juan" required/>
            <FormField id="lastname" label="Last Name" placeholder="Dela Cruz" required/>
          <FormField id="middleinitial" label="M.I" placeholder="D." className="w-16"/>
          <div className="flex flex-col">
            <label htmlFor="suffix">Suffix</label>
            <select name="suffix" id="suffix" defaultValue="N/A" className="border p-2 border-black/20 rounded-2xl">
              <option value="N/A">N/A</option>
              <option value="Jr.">Jr.</option>
              <option value="Sr.">Sr.</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField id="email" label="Email" placeholder="jmdelacruz@email.com" type="email" required />
          <FormField id="phonenumber" label="Phone No." placeholder="09XXXXXXXXX" type="text" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField id="password" label="Password" placeholder="Password" type="password" required/>
          <FormField id="password" label="Confirm Password" placeholder="Confirm Password" type="password" required/>
        </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-rose-800 cursor-pointer"
          >
            Submit
          </button>
      </form>
  );
}

function FormField({ id, label, placeholder, required = false, className = "", type="text"}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        type={type}
        className={`border w-full rounded-2xl p-2 pl-4 border-black/20 ${className}`}
      />
    </div>
  );
}
