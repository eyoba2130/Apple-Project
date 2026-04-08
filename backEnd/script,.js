(function() {
  // DOM elements
  const form = document.getElementById('productForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetFormBtn');
  const categorySelect = document.getElementById('product_category');
  const dynamicHeading = document.getElementById('dynamicHeading');
  const productImgInput = document.getElementById('product_img');
  const imagePreviewArea = document.getElementById('imagePreviewArea');
  const globalFeedbackDiv = document.getElementById('globalFeedback');

  // Helper: clear all inline errors
  function clearAllFieldErrors() {
    const errorContainers = document.querySelectorAll('.error-container');
    errorContainers.forEach(container => {
      container.innerHTML = '';
    });
    const errorInputs = document.querySelectorAll('.error-input');
    errorInputs.forEach(input => input.classList.remove('error-input'));
  }

  // Display error under specific field
  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) field.classList.add('error-input');
    const errorContainer = document.querySelector(`.error-container[data-field="${fieldId}"]`);
    if (errorContainer) {
      errorContainer.innerHTML = `<span class="error-message">⚠️ ${message}</span>`;
    } else {
      const parent = field?.parentElement;
      if (parent && !parent.querySelector('.error-message')) {
        const errSpan = document.createElement('div');
        errSpan.className = 'error-message';
        errSpan.style.marginTop = '5px';
        errSpan.style.fontSize = '0.75rem';
        errSpan.style.color = '#e11d48';
        errSpan.innerText = message;
        parent.appendChild(errSpan);
        setTimeout(() => errSpan.remove(), 3000);
      }
    }
  }

  // validation logic
  function validateFormData() {
    clearAllFieldErrors();
    let isValid = true;
    const errors = {};

    const prodName = document.getElementById('product_name').value.trim();
    if (!prodName) {
      isValid = false;
      errors.product_name = 'Product name is required.';
    } else if (prodName.length < 2) {
      isValid = false;
      errors.product_name = 'Product name must be at least 2 characters.';
    }

    const prodUrl = document.getElementById('product_url').value.trim();
    if (!prodUrl) {
      isValid = false;
      errors.product_url = 'Product URL is required.';
    } else if (!isValidUrl(prodUrl)) {
      isValid = false;
      errors.product_url = 'Enter a valid URL (include http:// or https://).';
    }

    const briefDesc = document.getElementById('product_brief_description').value.trim();
    if (!briefDesc) {
      isValid = false;
      errors.product_brief_description = 'Brief description is required.';
    } else if (briefDesc.length < 5) {
      isValid = false;
      errors.product_brief_description = 'Brief description should be at least 5 characters.';
    }

    const imgUrl = document.getElementById('product_img').value.trim();
    if (!imgUrl) {
      isValid = false;
      errors.product_img = 'Product image URL is required.';
    } else if (!isValidUrl(imgUrl)) {
      isValid = false;
      errors.product_img = 'Image URL must be a valid URL (http/https).';
    }

    const linkUrl = document.getElementById('product_link').value.trim();
    if (!linkUrl) {
      isValid = false;
      errors.product_link = 'Product link URL is required.';
    } else if (!isValidUrl(linkUrl)) {
      isValid = false;
      errors.product_link = 'Product link must be a valid URL.';
    }

    const priceRaw = document.getElementById('starting_price').value.trim();
    if (!priceRaw) {
      isValid = false;
      errors.starting_price = 'Starting price is required.';
    } else {
      const priceNum = parseFloat(priceRaw);
      if (isNaN(priceNum) || priceNum < 0) {
        isValid = false;
        errors.starting_price = 'Price must be a positive number (e.g., 999.99).';
      }
    }

    const priceRange = document.getElementById('price_range').value.trim();
    if (!priceRange) {
      isValid = false;
      errors.price_range = 'Price range is required (e.g., $899 - $1299).';
    }

    if (!categorySelect.value) {
      isValid = false;
      errors.product_category = 'Please select a category.';
    }

    for (const [fieldId, msg] of Object.entries(errors)) {
      showFieldError(fieldId, msg);
    }

    return { isValid, errors };
  }

  function isValidUrl(string) {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  function updateHeadingByCategory() {
    const selectedOption = categorySelect.options[categorySelect.selectedIndex];
    let categoryText = selectedOption.text.replace(/[📱💻📟⌚📺🛠️]/g, '').trim();
    if (!categoryText) categoryText = selectedOption.value;
    dynamicHeading.innerText = `Add ${categoryText} Product`;
  }

  function updateImagePreview() {
    const imgUrl = productImgInput.value.trim();
    imagePreviewArea.innerHTML = '';
    if (imgUrl && isValidUrl(imgUrl)) {
      const imgElement = document.createElement('img');
      imgElement.src = imgUrl;
      imgElement.alt = 'Preview';
      imgElement.className = 'img-preview';
      imgElement.onerror = () => {
        imgElement.style.opacity = '0.5';
        imgElement.style.border = '1px solid #e11d48';
        imgElement.alt = 'Invalid image URL';
      };
      const removeBtn = document.createElement('span');
      removeBtn.innerHTML = '✖️';
      removeBtn.style.cursor = 'pointer';
      removeBtn.style.fontSize = '0.8rem';
      removeBtn.style.background = '#f1f5f9';
      removeBtn.style.padding = '4px 8px';
      removeBtn.style.borderRadius = '40px';
      removeBtn.title = 'Clear preview URL';
      removeBtn.onclick = () => {
        productImgInput.value = '';
        updateImagePreview();
      };
      imagePreviewArea.appendChild(imgElement);
      imagePreviewArea.appendChild(removeBtn);
    } else if (imgUrl && !isValidUrl(imgUrl)) {
      const warnSpan = document.createElement('span');
      warnSpan.className = 'preview-placeholder';
      warnSpan.innerText = '⚠️ Invalid URL — preview not available';
      warnSpan.style.background = '#fee2e2';
      warnSpan.style.color = '#b91c1c';
      imagePreviewArea.appendChild(warnSpan);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'preview-placeholder';
      placeholder.innerText = '✨ Image preview will appear here';
      imagePreviewArea.appendChild(placeholder);
    }
  }

  function showFeedback(message, type = 'success') {
    globalFeedbackDiv.textContent = message;
    globalFeedbackDiv.className = `feedback-toast ${type}`;
    globalFeedbackDiv.style.display = 'block';
    setTimeout(() => {
      globalFeedbackDiv.style.display = 'none';
    }, 4500);
  }

  function resetFormFields() {
    form.reset();
    clearAllFieldErrors();
    updateHeadingByCategory();
    updateImagePreview();
    showFeedback('Form has been reset.', 'success');
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const { isValid, errors } = validateFormData();
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      showFeedback('Please fix the errors before submitting.', 'error');
      return;
    }

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Adding product ...';

    const formData = new FormData(form);
    const searchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      searchParams.append(key, value);
    }

    try {
      const response = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: searchParams.toString(),
      });

      let responseText = '';
      try {
        responseText = await response.text();
      } catch (e) {
        responseText = 'Server responded without text';
      }

      if (response.ok) {
        showFeedback(`✅ Product "${formData.get('product_name')}" added successfully!`, 'success');
        form.reset();
        clearAllFieldErrors();
        updateHeadingByCategory();
        updateImagePreview();
      } else {
        let errorMsg = `❌ Server error (${response.status}).`;
        if (responseText) errorMsg += ` Details: ${responseText.substring(0, 100)}`;
        showFeedback(errorMsg, 'error');
      }
    } catch (networkError) {
      console.error('Fetch error:', networkError);
      showFeedback('🌐 Network error: Could not reach the server. Make sure backend is running at http://localhost:5000', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }

  // Event listeners
  categorySelect.addEventListener('change', updateHeadingByCategory);
  productImgInput.addEventListener('input', updateImagePreview);
  form.addEventListener('submit', handleFormSubmit);
  resetBtn.addEventListener('click', resetFormFields);

  // Clear field-specific errors on input
  const allInputs = document.querySelectorAll('input, textarea, select');
  allInputs.forEach(input => {
    input.addEventListener('input', function() {
      const fieldId = this.id;
      if (fieldId) {
        const errorContainer = document.querySelector(`.error-container[data-field="${fieldId}"]`);
        if (errorContainer) errorContainer.innerHTML = '';
        this.classList.remove('error-input');
      }
      if (this.id === 'product_img') updateImagePreview();
    });
  });

  // Initial UI setup
  updateImagePreview();
  updateHeadingByCategory();
})();